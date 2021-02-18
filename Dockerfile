FROM daptin/daptin:travis

RUN mkdir -p /opt/daptin/storage/documents
RUN mkdir -p /opt/daptin/daptinweb/dist/spa
COPY dist/spa /opt/daptin/daptinweb/dist/spa
ENV DAPTIN_DASHBOARD /opt/daptin/dashboard
ENV DAPTIN_PORT_VARIABLE PORT

ENTRYPOINT /opt/daptin/daptin -dashboard /opt/daptin/dashboard -port :8080
