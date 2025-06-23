INSERT INTO courses (id, name, number_of_participants, classification, department, participantsGroup)
VALUES
    ('f47ac10b-58cc-4372-a567-0e02b2c3d479', 'Java Fundamentals', 20, 'technical', 'java', ARRAY['managers', 'developers']),
    ('f47ac10b-58cc-4372-a567-0e02b2c3d480', 'Spring Boot Advanced practice', 15, 'softSkills', 'java', ARRAY['hr', 'developers']),
    ('f47ac10b-58cc-4372-a567-0e02b2c3d481', 'React Basics', 25, 'technical', 'java', ARRAY[ 'administration','hr','developers']),
    ('f47ac10b-58cc-4372-a567-0e02b2c3d482', 'SAP Project Management', 12, 'business', 'sap', ARRAY['developers', 'developers']),
    ('f47ac10b-58cc-4372-a567-0e02b2c3d483', 'Rest API for beginners', 18, 'technical', '.net', ARRAY['developers', 'hr']);