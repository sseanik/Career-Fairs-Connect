import psycopg2
conn = psycopg2.connect(
    database="postgres",
    user="postgres",
    password="wNUZrwPSsjuAxfwCTun",
    host="postgres.ci38hoehltvw.ap-southeast-2.rds.amazonaws.com",
    port='5432'
)
cur = conn.cursor()
cur.execute('SELECT version()')
db_version = cur.fetchone()
print(db_version)
