\echo "Delete and Recreate portfolio database?"
\prompt "Return for yes, CTRL-C to cancel > " foo

DROP DATABASE portfolio;
CREATE DATABASE portfolio;
\connect portfolio;

\i portfolio.schema.sql;
\i portfolio-seed.sql;

\echo "Delete and Recreate portfolio test database?"
\prompt "Return for yes, CTRL-C to cancel > " foo

DROP DATABASE portfolio_test;
CREATE DATABASE portfolio_test;
\connect portfolio_test;

\i portfolio.schema.sql;
\i portfolio-seed.sql;