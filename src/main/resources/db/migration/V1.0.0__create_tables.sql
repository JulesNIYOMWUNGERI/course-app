CREATE TABLE IF NOT EXISTS courses (
    id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    department VARCHAR(100) NOT NULL,
    classification VARCHAR(100) NOT NULL,
    number_of_participants INTEGER NOT NULL,
    participantsGroup TEXT[],
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS course_participants (
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL,
    course_id UUID NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    CONSTRAINT fk_course_participants_course FOREIGN KEY (course_id) REFERENCES courses(id),
    CONSTRAINT fk_course_participants_user FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS course_participants (
    id UUID PRIMARY KEY,
    course_id UUID NOT NULL,
    user_id UUID NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    CONSTRAINT fk_course_participants_course FOREIGN KEY (course_id) REFERENCES courses(id),
    CONSTRAINT fk_course_participants_user FOREIGN KEY (user_id) REFERENCES users(id)
    );

CREATE TABLE IF NOT EXISTS course_documents (

    id UUID PRIMARY KEY,
    course_id UUID NOT NULL,
    name VARCHAR(255) NOT NULL,
    document_path TEXT NOT NULL,
    document_type VARCHAR(100) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    CONSTRAINT fk_course_documents_course FOREIGN KEY (course_id) REFERENCES courses(id)
    );

ALTER TABLE course_documents DROP COLUMN document_path;
ALTER TABLE course_documents ADD COLUMN content BYTEA NOT NULL DEFAULT ''::bytea;
ALTER TABLE course_participants
DROP CONSTRAINT fk_course_participants_course;

