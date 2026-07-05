FROM python:3.12-slim

WORKDIR /docs

RUN pip install --no-cache-dir zensical

EXPOSE 8000

CMD ["zensical", "serve", "-a", "0.0.0.0:8000"]
