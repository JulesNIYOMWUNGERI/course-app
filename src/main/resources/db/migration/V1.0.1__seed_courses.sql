INSERT INTO courses (id, name, number_of_participants, classification, department, participants_group, created_at, updated_at)
VALUES
    ('f47ac10b-58cc-4372-a567-0e02b2c3d479', 'Java Fundamentals', 20, 'technical', 'java', ARRAY['managers', 'developers'], NOW(), NOW()),
    ('f47ac10b-58cc-4372-a567-0e02b2c3d480', 'Spring Boot Advanced', 15, 'technical', 'java', ARRAY['hr', 'developers'], NOW(), NOW()),
    ('f47ac10b-58cc-4372-a567-0e02b2c3d481', 'React Basics', 25, 'technical', 'javascript', ARRAY[ 'administration'], NOW(), NOW()),
    ('f47ac10b-58cc-4372-a567-0e02b2c3d482', 'Project Management', 12, 'soft-skills', 'management', ARRAY['developers', 'developers'], NOW(), NOW()),
    ('f47ac10b-58cc-4372-a567-0e02b2c3d483', 'Python for Data Science', 18, 'technical', 'python', ARRAY['developers', 'hr'], NOW(), NOW());