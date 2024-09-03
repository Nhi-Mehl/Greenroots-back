BEGIN;

INSERT INTO "project"
    ("id", "name", "description", "status", "city", "country", "continent")
VALUES 
    (1, 'Afrique forever', 'Le projet de reforestation en Afrique vise à restaurer les forêts tropicales et les savanes dégradées, tout en soutenant les communautés locales par des programmes d''agroforesterie durable. Cette initiative contribue à lutter contre la désertification et à préserver la biodiversité unique du continent.', 'En cours', 'Bandundu', 'Congo', 'Afrique'),
    (2, 'Asie incontournable', 'En Asie, ce projet de reforestation se concentre sur la revitalisation des forêts dégradées des régions tropicales et tempérées, notamment en plantant des espèces indigènes. Il soutient également les pratiques agricoles durables pour réduire la pression sur les écosystèmes forestiers.', 'A venir', 'Kanchanaburi', 'Thaïlande', 'Asie'),
    (3, 'Le vieux continent', 'Le projet européen de reforestation cherche à restaurer les forêts anciennes et à créer de nouveaux espaces boisés pour améliorer la biodiversité et atténuer les effets du changement climatique. Il met l''accent sur l''intégration des forêts dans les paysages ruraux et urbains.', 'Terminé', 'Sarajevo', 'Serbie', 'Europe'),
    (4, 'Le nouveau continent', 'Ce projet de reforestation en Amérique du Nord vise à restaurer les écosystèmes forestiers endommagés par les incendies et l''exploitation excessive. Il inclut également des initiatives pour protéger les habitats naturels de la faune et renforcer la résilience des forêts face aux changements climatiques.', 'A venir', 'Les trois rivières', 'Canada', 'Amérique du Nord'),
    (5, 'Amazônia verde', 'Le projet en Amérique du Sud se concentre sur la reforestation des zones dégradées de la forêt amazonienne et d''autres écosystèmes critiques. En plus de restaurer la couverture forestière, il vise à protéger les ressources en eau et à soutenir les populations autochtones dans la gestion durable des forêts.', 'En cours', 'Manaus', 'Brésil', 'Amérique du Sud'),
    (6, 'La canopée pacifique', 'En Océanie, ce projet de reforestation cible les forêts tropicales et subtropicales, ainsi que les zones côtières vulnérables. Il vise à restaurer la biodiversité unique de la région, tout en soutenant les communautés locales dans la gestion durable des terres et la protection contre l''érosion côtière.', 'En cours', 'Brisbane', 'Australie', 'Océanie');

INSERT INTO "species"
    ("id", "name", "scientific_name", "description", "price", "picture", "co2_compensation")
VALUES 
    (1,'Acacia', 'Acacia spp', 'L''acacia est un arbre épineux souvent trouvé dans les savanes. Il est essentiel pour la faune locale et est souvent résistant à la sécheresse.', 10.20, 1, 7),
    (3, 'Palmier dattier', 'Phoenix dactylifera', 'Cultivé pour ses fruits (les dattes), ce palmier est crucial dans les régions arides du Sahara.', 32.50, 1, 5),
    (4, 'Pin ponderosa', 'Pinus ponderosa', 'Un grand pin qui domine les forêts montagneuses de l''ouest des États-Unis.', 45.20, 2, 8),
    (5, 'Cyprès chauve', 'Taxodium distichum', 'Connu pour sa capacité à pousser dans les marécages, notamment dans le sud des États-Unis.', 28.70, 3, 3),
    (6, 'Acacia d''Amérique', 'Prosopis pallida', 'Résistant à la sécheresse, cet arbre est commun dans les régions arides d''Amérique du Sud.', 18.90, 4, 6),
    (7, 'Ipê', 'Handroanthus spp.', 'Un arbre aux fleurs colorées, son bois est très dur et résistant.', 42.00, 5, 7),
    (8, 'Chêne pédonculé', 'Quercus robur', 'Un des arbres les plus anciens et les plus respectés en Europe, utilisé pour le bois et dans les parcs.', 25.50, 6, 4),
    (9, 'Hêtre commun', 'Fagus sylvatica', 'Très répandu dans les forêts européennes, connu pour son bois et ses fruits (faînes).', 38.10, 7, 9),
    (10, 'Cerisiers japonais', 'Prunus serrulata', 'Célèbre pour sa floraison spectaculaire, il est un symbole du Japon.', 49.00, 8, 2),
    (11, 'Eucalyptus', 'Eucalyptus spp.', 'Introduit, il est cultivé dans plusieurs régions pour le bois et l''huile essentielle.', 22.30, 9, 5),
    (12, 'Grevillea', 'Grevillea robusta', 'Un arbre à fleurs jaune vif, souvent utilisé comme ornemental.', 36.70, 10, 7),
    (13, 'Cocotier', 'Cocos nucifera', 'Bien que commun dans les régions tropicales, ce palmier est crucial pour les économies insulaires.', 41.50, 11, 6),
    (14, 'Sequoia géant', 'Sequoiadendron giganteum', 'L''arbre le plus volumineux du monde, emblématique de la Californie.', 50.00, 12, 10),
    (15, 'Baobab', 'Adansonia digitata', 'Arbre emblématique de l''Afrique, connu pour sa longévité et sa capacité à stocker l''eau.', 39.20, 13, 8);

INSERT INTO "project_tree"
    ("id", "basic_quantity", "current_quantity", "project_id", "species_id")
VALUES 
    (1, 100000, 50000, 1, 1),
    (2, 20000, 1000, 1, 3),
    (3, 50000, 11000, 1, 12),
    (4, 20000, 18000, 2, 10),
    (5, 100000, 50000, 2, 11),
    (6, 20000, 1000, 2, 3),
    (7, 50000, 11000, 3, 8),
    (8, 20000, 18000, 3, 9),
    (9, 100000, 50000, 4, 1),
    (10, 20000, 1000, 4, 5),
    (11, 50000, 11000, 4, 4),
    (12, 20000, 18000, 5, 14),
    (13, 100000, 50000, 5, 7),
    (14, 20000, 1000, 5, 6),
    (15, 50000, 11000, 3, 10),
    (16, 20000, 18000, 4, 7),
    (17, 20000, 1000, 6, 12),
    (18, 50000, 11000, 6, 13),
    (19, 20000, 18000, 6, 15);

INSERT INTO "user"
    ("id", "first_name", "last_name", "role", "address", "zip_code", "city", "country", "phone_number", "email", "password")
VALUES 
    (1, 'John', 'Doe', 'user', '123 Main St', '12345', 'Anytown', 'USA', '1234567890', 'johndoe@example.com', 'password123'),
    (2, 'Jane', 'Smith', 'user', '456 Elm St', '67890', 'Othertown', 'Canada', '9876543210', 'janesmith@example.com', 'password456'),
    (3, 'Michael', 'Williams', 'user', '789 Maple St', '23456', 'Hometown', 'UK', '2223334444', 'michaelwilliams@example.com', 'password321'),
    (4, 'Sarah', 'Brown', 'user', '1011 Pine Ave', '78901', 'Bigtown', 'Germany', '3334445555', 'sarahbrown@example.com', 'password789'),
    (5, 'David', 'Miller', 'user', '1213 Oak Blvd', '34567', 'Smallville', 'France', '4445556666', 'davidmiller@example.com', 'password456'),
    (6, 'Jennifer', 'Garcia', 'user', '1415 Elm Lane', '89012', 'Lakewood', 'Spain', '5556667777', 'jennifergarcia@example.com', 'password123'),
    (7, 'Matthew', 'Davis', 'user', '1617 Maple Dr', '45678', 'Suburbia', 'Italy', '6667778888', 'matthewdavis@example.com', 'password987'),
    (8, 'Jessica', 'Rodriguez', 'user', '1819 Pine Rd', '90123', 'Metropolis', 'Japan', '7778889999', 'jessicarodriguez@example.com', 'password321'),
    (9, 'James', 'Wilson', 'user', '2021 Oak Ct', '56789', 'Oakville', 'China', '8889990000', 'jameswilson@example.com', 'password789'),
    (10, 'Ashley', 'Clark', 'user', '2223 Elm Way', '01234', 'Riverside', 'India', '9990001111', 'ashleyclark@example.com', 'password456'),
    (19, 'Brandon', 'Wright', 'user', '3839 Maple St', '87654', 'Springfield', 'Brazil', '1231231234', 'brandonwright@example.com', 'password321'),
    (20, 'Emily', 'Lopez', 'user', '4041 Pine Ave', '98765', 'Sunsetville', 'Russia', '2342342345', 'emilylopez@example.com', 'password789');

INSERT INTO "order"
    ("id", "amount", "date", "user_id")
VALUES 
    (1, 636,'2024-06-03 14:30:00+02:00', 1);

INSERT INTO "order_line"
    ("id", "quantity", "amount", "project_tree_id", "order_id")
VALUES 
    (1, 10, 255, 7, 1),
    (2, 10, 381, 9, 1);


COMMIT; 
