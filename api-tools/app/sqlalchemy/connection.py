from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import time


def create_db_engine(user, password, ip, db_name, port=3306):
    """Create a database engine with the given credentials."""
    connection_string = f"mysql+pymysql://{user}:{password}@{ip}:{port}/{db_name}"
    return create_engine(connection_string)


def get_db_session(engine):
    """Create a session factory bound to the engine."""
    start_time = time.time()
    Session = sessionmaker(bind=engine)
    session = Session()
    elapsed_ms = (time.time() - start_time) * 1000
    print(f"Session creation took {elapsed_ms:.2f} ms")
    return session

# Example usage:
# engine = create_db_engine('username', 'password', 'database_ip', 'database_name')
# session = get_db_session(engine)