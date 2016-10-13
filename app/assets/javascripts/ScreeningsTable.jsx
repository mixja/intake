import React from 'react'
import ResponseTime from 'ResponseTime'
import ScreeningDecision from 'ScreeningDecision'
import moment from 'moment'

export default class ScreeningsTable extends React.Component {
  constructor() {
    super(...arguments)
  }

  render() {
    return (
      <div className='table-responsive'>
        <table className='table table-hover'>
          <thead>
            <tr>
              <th scope='col'>Name &amp; ID</th>
              <th scope='col'>Response Time</th>
              <th scope='col'>Decision</th>
              <th scope='col'>Report Date</th>
            </tr>
          </thead>
          <tbody>
            {
              this.props.screenings.map((screeningObject) => {
                const screening = screeningObject.attributes
                return (
                  <tr key={screening.id}>
                    <td><a href={`/screenings/${screening.id}`}>{`${screening.name} - ${screening.reference}`}</a></td>
                    <td>{ResponseTime[screening.response_time]}</td>
                    <td>{ScreeningDecision[screening.screening_decision]}</td>
                    <td>{moment(screening.created_at).format('MM/DD/YYYY')}</td>
                  </tr>
                  )
              })
            }
          </tbody>
        </table>
      </div>
    )
  }
}

ScreeningsTable.propTypes = {
  screenings: React.PropTypes.array,
}

ScreeningsTable.defaultProps = {
  screenings: [],
}