FROM daptin/daptin:travis

RUN mkdir -p /opt/daptin/storage/documents
ADD dist/spa /opt/daptin/site
ENV DAPTIN_DASHBOARD /opt/daptin/site
ENV DAPTIN_PORT_VARIABLE PORT

CMD /opt/daptin/daptin -dashboard /opt/daptin/site -port :8080
