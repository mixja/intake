FROM casecommons/ca_intake_base_image:latest
MAINTAINER Pema Geyleg <pema@casecommons.org>
HEALTHCHECK --interval=3s --retries=20 CMD ${HEALTHCHECK:-curl -fs localhost:${HTTP_PORT:-3000}}

ENV APP_HOME /ca_intake
RUN mkdir $APP_HOME
WORKDIR $APP_HOME

COPY release /release
RUN dpkg -i /release/*.deb && rm -rf /release

ENV BUNDLE_PATH /ca_intake/ruby_gems

COPY scripts/entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

VOLUME ["/ca_intake/public"]

ENTRYPOINT ["entrypoint.sh"]
CMD ["bundle","exec","puma","-e","production","-C","config/puma.rb"]
