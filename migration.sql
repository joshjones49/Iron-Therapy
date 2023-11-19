DROP TABLE IF EXISTS exercises;
DROP TABLE IF EXISTS member;
DROP TABLE IF EXISTS workout;

CREATE TABLE exercises (
    id SERIAL PRIMARY KEY,
    movement VARCHAR(255), 
    target_area VARCHAR(255),
    push_pull_legs VARCHAR(255)
);

CREATE TABLE member (
    id SERIAL PRIMARY KEY,
    fname VARCHAR(255),
    lname VARCHAR(255),
    email VARCHAR(255)
);

CREATE TABLE workout (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    script TEXT,
    memberID BIGINT REFERENCES member(id) 
);

INSERT INTO exercises (movement, target_area, push_pull_legs) VALUES
('bench press', 'chest', 'push'),
('overhead press', 'shoulders', 'push'),
('push ups', 'chest', 'push'),
('dumbbell flyes', 'chest', 'push'),
('tricep dips', 'triceps', 'push'),
('incline bench press', 'upper chest', 'push'),
('dumbbell shoulders press', 'shoulders', 'push'),
('close grip bench press', 'chest', 'push'),
('front raise', 'shoulders', 'push'),
('chest press machine', 'chest', 'push'),
('arnold press', 'shoulders', 'push'),
('cable crossover', 'chest', 'push'),
('tricep kickbacks', 'triceps', 'push'),
('decline bench press', 'chest', 'push'),
('lateral raises', 'shoulders', 'push'),
('pec deck machine', 'chest', 'push'),
('tricep pushdowns', 'triceps', 'push'),
('shoulders press machine', 'shoulders', 'push'),
('diamond push ups', 'chest', 'push'),
('overhead tricep extensions', 'triceps', 'push'),
('pull ups', 'back, biceps', 'pull'),
('barbell rows', 'back', 'pull'),
('lat pulldowns', 'back, biceps', 'pull'),
('face pulls', 'upper back', 'pull'),
('chin ups', 'back, biceps', 'pull'),
('t bar rows', 'middle back', 'pull'),
('seated cable rows', 'back', 'pull'),
('hammer curls', 'biceps', 'pull'),
('wide pull ups', 'back, biceps', 'pull'),
('single arm dumbbell rows', 'back', 'pull'),
('inverted rows', 'back, biceps', 'pull'),
('lat pushdowns', 'lats', 'pull'),
('kroc rows', 'back', 'pull'),
('preacher curls', 'biceps', 'pull'),
('machine lat pulldowns', 'back, biceps', 'pull'),
('shrugs', 'traps', 'pull'),
('close grip lat pulldowns', 'back, biceps', 'pull'),
('reverse grip barbell rows', 'upper back, biceps', 'pull'),
('wide dumbbell curls', 'biceps', 'pull'),
('squats', 'quads', 'legs'),
('deadlifts', 'hamstrings', 'pull'),
('leg press', 'quads', 'legs'),
('lunges', 'quads', 'legs'),
('romanian deadlifts', 'hamstrings', 'pull'),
('hack squats', 'quads', 'legs'),
('calf raises', 'calves', 'legs'),
('step ups', 'quads', 'legs'),
('good mornings', 'hamstrings', 'pull'),
('leg extensions', 'quads', 'legs'),
('leg curls', 'hamstrings', 'legs'),
('box jumps', 'quads', 'legs'),
('walking lunges', 'quads', 'legs'),
('bulgarian split squats', 'quads', 'legs'),
('seated leg press', 'quads', 'legs'),
('sumo deadlifts', 'hamstrings', 'pull'),
('front squats', 'quads', 'legs'),
('hamstring curls', 'hamstrings', 'legs'),
('cossack squats', 'quads', 'legs');