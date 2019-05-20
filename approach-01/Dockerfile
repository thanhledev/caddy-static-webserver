FROM yobasystems/alpine:3.9.0-amd64
MAINTAINER thanhle <thanhledev@gmail.com>

RUN apk --no-cache add openssh-client git libcap \ 
&& apk --no-cache add --virtual .devs tar curl

#install caddy server and required middleware
RUN curl --silent --show-error --fail --location --header "Accept: application/tar+gzip, application/x-gzip, application/octet-stream" -o - \
      "https://caddyserver.com/download/linux/amd64?license=personal&telemetry=off" \
    | tar --no-same-owner -C /usr/bin/ -xz caddy \
 && chmod 0755 /usr/bin/caddy \
 && addgroup -S caddy \
 && adduser -D -S -s /sbin/nologin -G caddy caddy \
 && setcap cap_net_bind_service=+ep `readlink -f /usr/bin/caddy` \
 && /usr/bin/caddy -version && apk del .devs

#setup website root directory
RUN mkdir -p /var/www/html && chmod -R 0755 /var/www/html && chown -R caddy:caddy /var/www/html

#setup log files
RUN mkdir -p /var/log/caddy && touch /var/log/caddy/access.log /var/log/caddy/errors.log \
    && chmod -R 0744 /var/log/caddy && chown -R caddy:caddy /var/log/caddy

WORKDIR /etc

# Let's Encrypt Agreement
ENV ACME_AGREE="false"

USER caddy

ENTRYPOINT ["/usr/bin/caddy"]
CMD ["--conf", "/etc/Caddyfile"]
