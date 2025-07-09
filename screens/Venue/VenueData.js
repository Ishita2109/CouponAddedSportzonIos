import { act } from "react";

export const venuedata = [

    {
      "_id": "6613f419fc02d7c44e18ef33",
      "title": "Sportzon Wave City",
      "slug": "sportzon-wave-city",
     rating: 5.0,
    address1: 'Sportzon, Wave City Marg, Ghaziabad, Uttar Pradesh',
    address2:'Sportzon, Wave City Marg, near NH24, Sector - 6    Ghaziabad, Uttar Pradesh  201005',
    image: 'https://sportzon-cdn.s3.ap-south-1.amazonaws.com/venues/1720675247193-1696401518363-aboutTop.jpeg',
    gallery: [
      'https://sportzon-cdn.s3.ap-south-1.amazonaws.com/venues/1720675247193-1696401518363-aboutTop.jpeg',
      "https://sportzon-cdn.s3.ap-south-1.amazonaws.com/Sportzon-App/Home+Page+Images/Sportzonwavecityghz+2.jpg",
      "https://sportzon-cdn.s3.ap-south-1.amazonaws.com/Sportzon-App/Home+Page+Images/Sportzonwavecityghz+1.jpg",
      "https://sportzon-cdn.s3.ap-south-1.amazonaws.com/Sportzon-App/Home+Page+Images/Sportzonwavecityghz4.jpg",
      "https://sportzon-cdn.s3.ap-south-1.amazonaws.com/Sportzon-App/Home+Page+Images/Sportzonwavecityghz+8.jpg",
      "https://sportzon-cdn.s3.ap-south-1.amazonaws.com/Sportzon-App/Home+Page+Images/Sportzonwavecityghz+7.jpg",
      "https://sportzon-cdn.s3.ap-south-1.amazonaws.com/Sportzon-App/Home+Page+Images/Sportzonwavecityghz+6.jpg",
      "https://sportzon-cdn.s3.ap-south-1.amazonaws.com/Sportzon-App/Home+Page+Images/Sportzonwavecityghz+5.jpg",
      "https://sportzon-cdn.s3.ap-south-1.amazonaws.com/Sportzon-App/Home+Page+Images/Sportzonwavecityghz+3.jpg",
      "https://sportzon-cdn.s3.ap-south-1.amazonaws.com/Sportzon-App/Home+Page+Images/Sportzonwavecityghz+2.jpg",
      "https://sportzon-cdn.s3.ap-south-1.amazonaws.com/Sportzon-App/Home+Page+Images/Sportzonwavecityghz+1.jpg",
  
      ],
    timings: '6:00 AM - 10:00 PM',
    amenities: [
      { "label": "Washroom",  "value": "Washroom"},
      { "label": "Seating Area",  "value": "Seating Area"},
      { "label": "Playground",  "value": "Playground"},
      { "label": "Parking",  "value": "Parking"},
      { "label": "Changing Room",  "value": "Changing Room"},
      { "label": "Restroom",  "value": "Restroom"},
    ],
    city:"Ghaziabad",
    state:"Uttar Pradesh",
    sportimages: [ { "label": "Cricket",  "value": "Cricket", "icon": "https://sportzon-cdn.s3.ap-south-1.amazonaws.com/Sportzon-App/Icons/cricket.png"},
      { "label": "Football",  "value": "Football", "icon": "https://sportzon-cdn.s3.ap-south-1.amazonaws.com/Sportzon-App/Icons/football.png" },
      { "label": "Tennis",  "value": "Tennis", "icon": "https://sportzon-cdn.s3.ap-south-1.amazonaws.com/Sportzon-App/Icons/tennis.png"},
      { "label": "Basketball",  "value": "Basketball", "icon": "https://sportzon-cdn.s3.ap-south-1.amazonaws.com/Sportzon-App/Icons/basketball.png" },
      { "label": "Speed Skating", "value": "Speed Skating", "icon": "https://sportzon-cdn.s3.ap-south-1.amazonaws.com/Sportzon-App/Icons/skating.png"},
    ],
      "activities": [
        { "label": "Cricket", "value": "Cricket" },
        {"label": "Basketball", "value": "Basketball"},       
        {"label": "Tennis", "value": "Tennis"},
        {"label": "Speed Skating","value": "Speed Skating"},
        {"label": "Football-Turf/Box-Cricket","value": "Football-Turf/Box-Cricket" }
      ],
      "description": "Discover Sportzon Wave City, your ultimate sports haven in Wave City NH24, Ghaziabad, Uttar Pradesh. Open from 6 am to 10 pm daily, our venue offers cricket, basketball, football, tennis, martial arts, skating, and pay-and-play options. With top-notch amenities including security, washrooms, and drinking water facilities, Sportzon Wave City is where sports thrive and friendships flourish.", 
    },
    {
      "_id": "67f38d08a4e7f1d0453510d7",
    "title": "Rishikul Vidyapeeth Sonipat",
    "slug": "rishikul-vidyapeeth-sonipat",
    rating: 4.8,
    address1: "Sonipat, Haryana 131001",
    address2: "Devru Rd, Jeevan Vihar, Sonipat, Haryana 131001",
    image:'https://sportzon-cdn.s3.ap-south-1.amazonaws.com/venues/1744014599399-b65be19a-332d-4ef5-a7a9-5b734ce50222.jpg',
    gallery: [
        "https://sportzon-cdn.s3.ap-south-1.amazonaws.com/venues/1744014599399-b65be19a-332d-4ef5-a7a9-5b734ce50222.jpg"
    ],
    
    timings:'8:00 AM - 5:00 PM',
    amenities: [
      { "label": "Washroom",  "value": "Washroom"},
      { "label": "Seating Area",  "value": "Seating Area"},
      { "label": "Parking",  "value": "Parking"},
      { "label": "Drinking Water",  "value": "Drinking Water"},
      
    ],
  
    city: "Sonipat",
    state: "Haryana",
    sportimages: [
         { "label": "Badminton",  "value": "Badminton","icon":"https://sportzon-cdn.s3.ap-south-1.amazonaws.com/Sportzon-App/Icons/tennis.png"},
    ],
    "activities": [{"label": "Badminton", "value": "Badminton"}],
    "description": "Rishikul Vidyapeeth is a co-educational private school located in Sonipat, Haryana, India. The school has 200 teachers at the senior and junior level, and an enrollment of two thousand students. ",
  },
    {
      "_id": "671750d4992357ea7629a123",
      "title": "kTwelve School , Jaipur",
      "slug": "ktwelve-school-,-jaipur",
      address1: 'Jaipur, Rajasthan',
    address2: "Near Sanga Automotive, Sector 35, Sanganer, Pratap Nagar, Jaipur, Rajasthan 302029 ",
    image: 'https://sportzon-cdn.s3.ap-south-1.amazonaws.com/venues/1729581267895-k12school.png',
    "gallery": [
        "https://sportzon-cdn.s3.ap-south-1.amazonaws.com/venues/1729581267895-k12school.png"
      ],
    rating: 4.8,
    timings: '6:00 AM - 5:00 PM',
    amenities: [
      { "label": "Washroom",  "value": "Washroom"},
      { "label": "Seating Area",  "value": "Seating Area"},
      { "label": "Parking", "value": "Parking" },
      { "label": "Drinking Water", "value": "Drinking Water"},
      { "label": "Changing Room", "value": "Changing Room" },
      { "label": "Restroom", "value": "Restroom" }],
    city: "Jaipur",
    state: "Rajasthan",
    sportimages: [
      {"label": "Cricket", "value": "Cricket", "icon": "https://sportzon-cdn.s3.ap-south-1.amazonaws.com/Sportzon-App/Icons/cricket.png"}],
      
    "activities": [{ "label": "Cricket", "value": "Cricket" }],
    "description": "K12 Sports Complex – The Ultimate Destination for Sports Enthusiasts\r\n\r\nWelcome to the K12 Sports Complex, a state-of-the-art facility designed to cater to athletes of all ages and skill levels. Whether you're looking for a place to hone your skills, play a friendly match, or host a competitive event, K12 has it all. Featuring world-class infrastructure, well-maintained courts, and expert coaches, this venue is perfect for sports enthusiasts across a wide range of activities.\r\n\r\nWith ample parking, modern amenities, and a vibrant community, K12 Sports Complex is the ideal spot for team practices, tournaments, and casual games. Book your slot today and experience the best in sports at K12!",
      
    },

    {
      "_id": "67163fa6992357ea76299cfb",
      "title": "JBM GLOBAL SCHOOL",
      "slug": "jbm-global-school",
      image: 'https://sportzon-cdn.s3.ap-south-1.amazonaws.com/venues/1729511334398-jbm-school.jpg',
      "gallery": [
        "https://sportzon-cdn.s3.ap-south-1.amazonaws.com/venues/1729511334398-jbm-school.jpg"
      ],
      address1: 'Sector 132, Noida, Uttar Pradesh',
    address2:'Expressway, A-11, Sector 132, Noida , Uttar Pradesh 201301",',
    rating: 4.6,
    timings: '8:00 AM - 6:00 PM',
    amenities: [
      { "label": "Washroom",  "value": "Washroom"},
      { "label": "Seating Area",  "value": "Seating Area"},
      { "label": "Parking", "value": "Parking" },
      { "label": "Drinking Water", "value": "Drinking Water"},
      { "label": "Changing Room", "value": "Changing Room" },
      { "label": "Restroom", "value": "Restroom" }],    
    city: "Noida",
    state: "Uttar Pradesh",
    sportimages: [
      {"label": "Cricket", "value": "Cricket", "icon": "https://sportzon-cdn.s3.ap-south-1.amazonaws.com/Sportzon-App/Icons/cricket.png"}],
    "activities": [{"label": "Cricket", "value": "Cricket" }],
      
    "description": "Established in 2008, JBM Global is a School in Sector 132, Expressway, Noida, an Air Conditioned Senior Secondary School, Wi-Fi enabled campus, sprawling lush green 10 acres of land offering the globally accepted CBSE system and Cambridge International Examination, houses, spacious well lit aesthetically developed and maintained smart classrooms with enriching environment, highly conducive to learning.",
    
      
    },

    {
      "_id": "67052eb49545c94f7a41b308",
      "title": "Elite Cricket Ground",
      "slug": "elite-cricket-ground",
      image: 'https://sportzon-cdn.s3.ap-south-1.amazonaws.com/venues/1728392884245-2024-07-24.jpg',
      "gallery": [
        "https://sportzon-cdn.s3.ap-south-1.amazonaws.com/venues/1728392884245-2024-07-24.jpg"
      ],
      address1: 'Sector 150, Noida, Uttar Pradesh',
      address2:'Behind Shaheed Bhagat Singh Kranti Niketan, Sector 150, Noida, Uttar Pradesh 201310',
      rating: 4.1,
      timings: '6:00 AM - 7:00 PM',
      amenities: [
        { "label": "Washroom",  "value": "Washroom"},
        { "label": "Seating Area",  "value": "Seating Area"},
        { "label": "Parking", "value": "Parking" },
        { "label": "Drinking Water", "value": "Drinking Water"},],
        city: "Noida",
      state: "Uttar Pradesh",

      sportimages: [
        {"label": "Cricket", "value": "Cricket", "icon": "https://sportzon-cdn.s3.ap-south-1.amazonaws.com/Sportzon-App/Icons/cricket.png" }],
      "activities": [{"label": "Cricket", "value": "Cricket"}],
      "description": "Located in the heart of Noida, Elite Cricket Ground (ECG) offers state-of-the-art facilities for cricket enthusiasts and professionals alike. The ground is meticulously maintained and has a lush green outfield, top-notch pitch quality, and ample space for players and spectators. With easy access from central Noida, ECG is perfect for tournaments, practice sessions, and corporate matches.\r\n\r\nWhether you want to improve your game or host a memorable event, ECG Noida provides the ideal setting with modern amenities, including parking, seating areas, and well-equipped changing rooms. Book your spot today to experience cricket at its best!",
      
    },
    {
      "_id": "67052af19545c94f7a41b2c5",
      "title": " Eklavya Cricket Ground",
      "slug": "-eklavya-cricket-ground",
      address1: 'Sector 150, Noida, Uttar Pradesh',
    address2:'Behind Shaheed Bhagat Singh Kranti Niketan, Sector 150, Noida, Uttar Pradesh 201310',
    image: 'https://sportzon-cdn.s3.ap-south-1.amazonaws.com/venues/1728391920241-1000134962.jpg',
    "gallery": [
      "https://sportzon-cdn.s3.ap-south-1.amazonaws.com/venues/1728391920241-1000134962.jpg",
      "https://sportzon-cdn.s3.ap-south-1.amazonaws.com/venues/1728391920249-2024-05-23.jpg"
    ],
    rating: 3.6,
    timings: '12:00 AM - 12:00 PM',
    amenities: [
      { "label": "Washroom",  "value": "Washroom"},
      { "label": "Seating Area",  "value": "Seating Area"},
      { "label": "Parking", "value": "Parking" },
      { "label": "Drinking Water", "value": "Drinking Water"},],
    city: "Noida",
    state: "Uttar Pradesh",
    sportimages: [{"label": "Cricket", "value": "Cricket", "icon": "https://sportzon-cdn.s3.ap-south-1.amazonaws.com/Sportzon-App/Icons/cricket.png"}],
    
      "activities": [{"label": "Cricket", "value": "Cricket" }],
      "description": "Book Eklavya Cricket ground (ECG) in Greater Noida for your next match or event. Explore cricket facilities and reserve your spot on CricHeroes.",
      
    },
    {
      "_id": "66ec1157850c84be4eb4f014",
      "title": "The Oval Cricket Ground by Sportsshala",
      "slug": "the-oval-cricket-ground-by-sportsshala",
      address1: 'Sector 140, Noida, Uttar Pradesh',
    address2:'Sector 140, Noida, Uttar Pradesh',
    image: 'https://sportzon-cdn.s3.ap-south-1.amazonaws.com/venues/1726746965312-64365.jpg',
    "gallery": [
        "https://sportzon-cdn.s3.ap-south-1.amazonaws.com/venues/1726746965312-64365.jpg",
        "https://sportzon-cdn.s3.ap-south-1.amazonaws.com/venues/1726746965313-64367.jpg"
      ],
    rating: 4.2,
    timings: '6:00 AM - 8:00 PM',
    amenities: [
      { "label": "Washroom",  "value": "Washroom"},
      { "label": "Seating Area",  "value": "Seating Area"},
      { "label": "Parking", "value": "Parking" },
      { "label": "Drinking Water", "value": "Drinking Water"},
      { "label": "Refreshment", "value": "Refreshment"},
      { "label": "Changing Room", "value": "Changing Room"} ],
    city: "Noida",
    state: "Uttar Pradesh",
    sportimages: [
      {"label": "Cricket", "value": "Cricket", "icon": "https://sportzon-cdn.s3.ap-south-1.amazonaws.com/Sportzon-App/Icons/cricket.png"}],
      "activities": [{"label": "Cricket", "value": "Cricket" }],
      "description": "The Oval Cricket Ground by Sportsshala is a premier cricket venue designed to offer world-class facilities for players and fans alike. Located in a picturesque setting, this ground features a well-maintained pitch, lush outfield, and modern amenities, ensuring an exceptional experience for all skill levels—from casual matches to competitive tournaments.\r\n\r\nWhether you’re a cricket enthusiast looking to book practice sessions or organizing large-scale events, The Oval Cricket Ground is the perfect venue. With ample parking, seating arrangements, and professional-grade infrastructure, Sportsshala guarantees a top-tier environment for athletes and spectators.",
      
    },

    {
      "_id": "66839ebaf44880098644c269",
      "title": "Wave City Golf Range",
      "slug": "wave-city-golf-range",
      address1: 'Sector 1, Wave City, Uttar Pradesh',
    address2: 'Sector 1, Wave City, Uttar Pradesh',
    image: 'https://sportzon-cdn.s3.ap-south-1.amazonaws.com/venues/1719901880363-golf%20%281%29.jpg',
    "gallery": [
        "https://sportzon-cdn.s3.ap-south-1.amazonaws.com/venues/1719901880363-golf%20%281%29.jpg"
      ],
    rating: 4.1,
    timings: '6:30 AM - 6:00 PM',
    amenities: [
      { "label": "Washroom",  "value": "Washroom"},
      { "label": "Seating Area",  "value": "Seating Area"},
      { "label": "Playground",  "value": "Playground"},
      { "label": "Parking",  "value": "Parking"},
      { "label": "Changing Room",  "value": "Changing Room"},
    ],
    city:"Ghaziabad",
    state:"Uttar Pradesh",
    sportimages: [ { "label": "Golf",  "value": "Golf", "icon": "https://sportzon-cdn.s3.ap-south-1.amazonaws.com/Sportzon-App/Icons/golf.png"},],
      "activities": [{ "label": "Golf","value": "Golf" }],
      "description": "Experience the Golf Grandeur at Wave City Golf Range.\r\nWelcome to Ghaziabad’s only Golf Range on NH-24, Wave City, Oakwood Enclave. Well-equipped with state-of-the-art golf infrastructure, this golf range is spread across 200 yards with separate 100 yards chipping and putting area. It has facilities like a 4-Hole Mini Golf Course, 16 Driving Zones, and a virtual golfing simulator.\r\nCome and indulge in World-Class Golfing at Wave City Golf Range.",
    },
    
    {
      "_id": "659e89a3eddc61c3380841db",
      "title": "Orchid International School ",
      "slug": "orchid-international-school-",
      address1: 'Sonepat,Sonipat, Haryana',
      address2:'New Braham Colony, 131001, Delhi Road, Sonepat, nearby ICICI Bank, Sonipat, Haryana 131001',
      image: "https://sportzon-cdn.s3.ap-south-1.amazonaws.com/venues/1705048731165-ER6_5776.jpg",
      "gallery": [
        "https://sportzon-cdn.s3.ap-south-1.amazonaws.com/venues/1705048731165-ER6_5776.jpg",
        "https://sportzon-cdn.s3.ap-south-1.amazonaws.com/venues/1705048731199-ER6_5815.jpg",
        "https://sportzon-cdn.s3.ap-south-1.amazonaws.com/venues%2F1705048731340-ER6_5832.jpg",
        "https://sportzon-cdn.s3.ap-south-1.amazonaws.com/venues/1705048731456-ER6_5961.jpg"
      ],
        
      rating: 5.0,
      timings: '8:00 AM - 6:00 PM',
      amenities: [
        { "label": "Washroom",  "value": "Washroom"},
        { "label": "Drinking Water",  "value": "Drinking Water"},],
      city: "Sonipat",
      state: "Haryana",
      sportimages: [
        { "label": "Football",  "value": "Football", "icon": "https://sportzon-cdn.s3.ap-south-1.amazonaws.com/Sportzon-App/Icons/football.png" },
        { "label": "Basketball",  "value": "Basketball", "icon": "https://sportzon-cdn.s3.ap-south-1.amazonaws.com/Sportzon-App/Icons/basketball.png"},
        { "label": "Table Tennis",  "value": "Table Tennis", "icon": "https://sportzon-cdn.s3.ap-south-1.amazonaws.com/Sportzon-App/Icons/table+tennis.png"},
        { "label": "Badminton",  "value": "Badminton","icon":"https://sportzon-cdn.s3.ap-south-1.amazonaws.com/Sportzon-App/Icons/tennis.png"},
      ],
      "activities": [
        {"label": "Football", "value": "Football"},
        {"label": "Basketball","value": "Basketball" },
        {"label": "Table Tennis","value": "Table Tennis"},
        {"label": "Badminton", "value": "Badminton"}
      ],
      "description": "Orchid International School in Sonepat, Haryana, located at New Braham Colony, offers facilities for cricket, football, and basketball. The school features one cricket pitch, two basketball courts, and a football field. While formal programs have not started, after-school sessions for sports are planned, emphasizing the school's commitment to a well-rounded education.",
      
    },
    {
      "_id": "659e86e5eddc61c338084169",
      "title": "East West Insitute of Technology",
      "slug": "east-west-insitute-of-technology",
      address1: 'Anjana Nagar, Bengaluru, Karnataka',
    address2: 'No. 63, East West College Road, Off, Magadi Main Rd, Vishwaneedam Post,\r\n Bharath Nagar, Anjana Nagar, Bengaluru, Karnataka 560091',
    image: "https://sportzon-cdn.s3.ap-south-1.amazonaws.com/Sportzon-App/Home+Page+Images/Sportzonwavecityghz+7.jpg",
    "gallery":[ "https://sportzon-cdn.s3.ap-south-1.amazonaws.com/Sportzon-App/Home+Page+Images/Sportzonwavecityghz+7.jpg"],
    rating: 3.4,
    timings: '8:00 AM - 6:00 PM',
    amenities: [
      { "label": "Washroom",  "value": "Washroom"},
      { "label": "Drinking Water", "value": "Drinking Water"},],
    city: "Bengaluru",
    state: "Karnataka",
    sportimages: [
      {"label": "Cricket", "value": "Cricket", "icon": "https://sportzon-cdn.s3.ap-south-1.amazonaws.com/Sportzon-App/Icons/cricket.png"},
      {"label": "Football", "value": "Football", "icon": "https://sportzon-cdn.s3.ap-south-1.amazonaws.com/Sportzon-App/Icons/football.png" },
      {"label": "Basketball", "value": "Basketball","icon":"https://sportzon-cdn.s3.ap-south-1.amazonaws.com/Sportzon-App/Icons/basketball.png"},],
      "activities": [
        {
          "label": "Cricket",
          "value": "Cricket"
        },
        {
          "label": "Football",
          "value": "Football"
        },
        {
          "label": "Basketball",
          "value": "Basketball"
        }
      ],
      "description": "East West Institute of Technology in Bangalore, located at No. 63, East West College Road, offers excellent sports facilities including cricket, football, and basketball. The campus features two cricket pitches, five cemented basketball courts, and a football field. While formal programs have not started yet, after-school sessions are planned for cricket, football, and basketball. The institute is committed to promoting a well-rounded education, encouraging physical fitness and teamwork among students.",
     },
    {
      "_id": "659e855aeddc61c33808415c",
      "title": "St. Xaviers High School",
      "slug": "st.-xaviers-high-school",
      address1: 'Tech Zone IV, Uttar Pradesh',
    address2:'Plot no 20 C, Tech Zone IV, Uttar Pradesh 201308',
    image: "https://sportzon-cdn.s3.ap-south-1.amazonaws.com/Sportzon-App/Home+Page+Images/Sportzonwavecityghz+1.jpg",
    gallery:["https://sportzon-cdn.s3.ap-south-1.amazonaws.com/Sportzon-App/Home+Page+Images/Sportzonwavecityghz+1.jpg",],
    rating: 4.8,
    timings: '4:00 PM - 6:30 PM',
    amenities: [
      { "label": "Washroom",  "value": "Washroom"},
      { "label": "Drinking Water", "value": "Drinking Water"},],   
  
    city: "Noida",
    state: "Uttar Pradesh",
    sportimages: [ {"label": "Cricket", "value": "Cricket" , "icon": "https://sportzon-cdn.s3.ap-south-1.amazonaws.com/Sportzon-App/Icons/cricket.png"},],
      "activities": [{"label": "Cricket", "value": "Cricket" }],
      "description": "St. Xavier's High School, located in Greater Noida at Plot no 20 C, Tech Zone IV, Uttar Pradesh 201308, offers a comprehensive cricket facility for enthusiasts and aspiring players. The school boasts a well-equipped cricket ground with a full perimeter of around 45 meters on each side, complete with two cemented nets and two center wickets. This setup provides an ideal environment for cricket training and practice.\r\n\r\nThe cricket sessions are scheduled on Tuesday and Thursday from 4:00 PM to 6:30 PM, with additional sessions on Saturday and Sunday from 7:00 AM to 10:00 AM. The practice days are extended to Tuesday, Thursday, Friday, and Saturday. St. Xavier's High School offers a 'Pay n play' system, allowing individuals to avail the cricket facilities as needed. Whether you're a student looking to enhance your skills or a cricket enthusiast seeking a quality playing field, St. Xavier's High School provides an accessible and well-maintained venue for cricket enthusiasts in Greater Noida.",
    },
    {
      "_id": "6515c04c6b2bcf5c29528bb1",
      "title": "The Basecamp",
      "slug": "the-basecamp",
      address1: 'Vasant Kunj, Delhi',
    address2:'Farm 25 A, Green Avenue Lane, Church Rd., behind Football Link, Vasant Kunj, Delhi 110070',
    image: 'https://sportzon-cdn.s3.ap-south-1.amazonaws.com/venues%2F1705060196651-DaOne+%28160+of+353%29.jpg',
    "gallery": [
      "https://sportzon-cdn.s3.ap-south-1.amazonaws.com/venues%2F1705060196651-DaOne+%28160+of+353%29.jpg",
      "https://sportzon-cdn.s3.ap-south-1.amazonaws.com/venues%2F1705060196897-DaOne+%28197+of+353%29.jpg",
      "https://sportzon-cdn.s3.ap-south-1.amazonaws.com/venues%2F1705060196981-DaOne+%28289+of+353%29.jpg"
    ],
    rating: 4.5,
    timings: '4:00 PM - 7:00 PM',
    amenities: [
      { "label": "Washroom",  "value": "Washroom"},
      { "label": "Drinking Water", "value": "Drinking Water"},
        { "label": "Parking", "value": "Parking" },],
    city: " South Delhi",
    state: "Delhi",
    sportimages: [{ "label": "Cricket", "value": "Cricket", "icon": "https://sportzon-cdn.s3.ap-south-1.amazonaws.com/Sportzon-App/Icons/cricket.png" }],
      "activities": [{"label": "Cricket", "value": "Cricket" }],
      "description": "Nestled in Vasant Kunj, Delhi, The Basecamp at Farm 25 A, Green Avenue Lane, Church Rd, behind Football Link, offers a dedicated space for cricket enthusiasts. Equipped with three cricket nets, this facility is perfect for honing your cricketing skills.\r\n\r\nOpen on Monday, Tuesday, and Thursday from 4:00 PM to 7:00 PM, as well as Saturday and Sunday from 7:00 AM to 10:00 AM, The Basecamp accommodates both day and night play.\r\n\r\nOperating on a convenient \"Pay n Play\" model, cricket lovers have the flexibility to enjoy the facility on weekdays and weekends. Whether you're a seasoned player or a casual enthusiast, The Basecamp provides an ideal setting to embrace the love for cricket.",
      
    },
    {
      "_id": "6515b2b4d2ac598b6df37026",
      "title": "The Dome",
      "slug": "the-dome",
      address1: 'Gurugram, Haryana 122102',
    address2:'Alahawas, Sector 59, Gurugram, Haryana 122102',
    image: "https://sportzon-cdn.s3.ap-south-1.amazonaws.com/Sportzon-App/Home+Page+Images/Sportzonwavecityghz+1.jpg",
    gallery:["https://sportzon-cdn.s3.ap-south-1.amazonaws.com/Sportzon-App/Home+Page+Images/Sportzonwavecityghz+1.jpg",],
    rating: 3.7,
    timings: '4:00 PM - 7:00 PM',
    amenities: [
      { "label": "Washroom",  "value": "Washroom"},
      { "label": "Drinking Water", "value": "Drinking Water"},
      { "label": "Parking", "value": "Parking" },],
    city: "Gurugram",
    state: "Haryana",
    sportimages: [ {"label": "Cricket", "value": "Cricket", "icon": "https://sportzon-cdn.s3.ap-south-1.amazonaws.com/Sportzon-App/Icons/cricket.png"},],
      "activities": [{"label": "Cricket", "value": "Cricket" }],
      "description": "The Dome in Gurgaon, located at Alahawas, Sector 59, Gurugram, Haryana 122102, offers three cricket grounds with a full boundary of approximately 60 meters on each side. Open for day and night play, the facility welcomes enthusiasts on weekdays (Monday, Tuesday, Thursday from 4:00 PM to 7:00 PM) and weekends (Saturday and Sunday from 7:00 AM to 10:00 AM). Operating on a \"Pay n Play\" basis, The Dome provides a premier setting for cricket lovers to enjoy state-of-the-art infrastructure and flexible scheduling.",
      
    },
    {
      "_id": "65146f4a831717ccf3c00a61",
      "title": "DPS International Edge",
      "slug": "delhi-public-school-international-edge",
      address1: 'Sector 50, Gurugram, Haryana',
    address2:'HS-01, Golf Course Ext Rd, Block W, South City II, Sector 50, Gurugram, Haryana 122001',
    image: 'https://sportzon-cdn.s3.ap-south-1.amazonaws.com/venues%2F1695838021301-DaOne+%28116+of+431%29.jpg',
    "gallery": [
      "https://sportzon-cdn.s3.ap-south-1.amazonaws.com/venues%2F1695838021301-DaOne+%28116+of+431%29.jpg",
      "https://sportzon-cdn.s3.ap-south-1.amazonaws.com/venues%2F1695838021335-DaOne+%2838+of+431%29.jpg",
      "https://sportzon-cdn.s3.ap-south-1.amazonaws.com/venues%2F1695838021355-DaOne+%2833+of+431%29.jpg",
      "https://sportzon-cdn.s3.ap-south-1.amazonaws.com/venues%2F1695838021416-DaOne+%281+of+431%29.jpg"
    ],
    rating: 5.0,
    timings: '3:45 PM - 5:15 PM',
    amenities: [
      { "label": "Washroom",  "value": "Washroom"},
      { "label": "Parking", "value": "Parking" },
      { "label": "Drinking Water", "value": "Drinking Water"},],
    city: "Gurugram",
    state: "Haryana",
    sportimages: [
      {"label": "Football", "value": "Football", "icon": "https://sportzon-cdn.s3.ap-south-1.amazonaws.com/Sportzon-App/Icons/football.png" },
      { "label": "Table Tennis", "value": "Table Tennis", "icon":"https://sportzon-cdn.s3.ap-south-1.amazonaws.com/Sportzon-App/Icons/table+tennis.png"},
      { "label": "Badminton", "value": "Badminton", "icon":"https://sportzon-cdn.s3.ap-south-1.amazonaws.com/Sportzon-App/Icons/badminton.png"},
      { "label": "Basketball", "value": "Basketball", "icon":"https://sportzon-cdn.s3.ap-south-1.amazonaws.com/Sportzon-App/Icons/basketball.png"},
      { "label": "Cricket", "value": "Cricket", "icon": "https://sportzon-cdn.s3.ap-south-1.amazonaws.com/Sportzon-App/Icons/cricket.png"},
      { "label": "Swimming", "value": "Swimming", "icon": "https://sportzon-cdn.s3.ap-south-1.amazonaws.com/Sportzon-App/Icons/cricket.png"},
      { "label": "Taekwondo", "value": "Taekwondo","icon": "https://sportzon-cdn.s3.ap-south-1.amazonaws.com/Sportzon-App/Icons/cricket.png"},
      { "label": "Speed Skating", "value": "Speed Skating", "icon":"https://sportzon-cdn.s3.ap-south-1.amazonaws.com/Sportzon-App/Icons/skating.png"},
      { "label": "Chess", "value": "Chess", "icon":"https://sportzon-cdn.s3.ap-south-1.amazonaws.com/Sportzon-App/Icons/chess.png"}],
      "activities": [
        {
          "label": "Cricket",
          "value": "Cricket"
        },
        {
          "label": "Table Tennis",
          "value": "Table Tennis"
        },
        {
          "label": "Badminton",
          "value": "Badminton"
        },
        {
          "label": "Basketball",
          "value": "Basketball"
        },
        {
          "label": "Swimming",
          "value": "Swimming"
        },
        {
          "label": "Taekwondo",
          "value": "Taekwondo"
        },
        {
          "label": "Speed Skating",
          "value": "Speed Skating"
        },
        {
          "label": "Football",
          "value": "Football"
        },
        {
          "label": "Chess",
          "value": "Chess"
        }
      ],
      "description": "Delhi Public Delhi Public School International Edge in Gurgaon, located at HS-01, Golf Course Ext Rd, Block W, South City II, Sector 50, Gurugram, Haryana 122001, offers a diverse sports program including Cricket, Table Tennis, Badminton, Basketball, Swimming, Taekwondo, Skating, Football, and Chess. The school provides two facilities, indoor and outdoor, for sports activities, with sessions scheduled from 3:45 to 5:15 PM on Monday, Tuesday, and Thursday. The sports program is designed for both in-school and after-school engagement, emphasizing a holistic and active educational experience.School International Edge",
      
    },
    {
      "_id": "65146e46831717ccf3c00a30",
      "title": "Alliance International School ",
      "slug": "alliance-international-school-",
      address1: 'Rajpura, Punjab',
      address2:'Swami Vivekanand Institute of Engineering and Technology, Vill. Ramnagar, \r\nNear Banur, Teh, adj. Gian Sagar Medical College & Hospital, Rajpura, 140601',
      image: "https://sportzon-cdn.s3.ap-south-1.amazonaws.com/Sportzon-App/Home+Page+Images/Sportzonwavecityghz+7.jpg",
    "gallery":[ "https://sportzon-cdn.s3.ap-south-1.amazonaws.com/Sportzon-App/Home+Page+Images/Sportzonwavecityghz+7.jpg"],
      rating: 3.0,
      timings: '8:00 AM - 6:00 PM',
      amenities: [
        { "label": "Washroom",  "value": "Washroom"},
        { "label": "Drinking Water", "value": "Drinking Water"},
        { "label": "Parking", "value": "Parking" },],
      city: "Rajpura",
      state: "Punjab",
      sportimages: [
        {"label": "Cricket", "value": "Cricket", "icon": "https://sportzon-cdn.s3.ap-south-1.amazonaws.com/Sportzon-App/Icons/cricket.png" },
        {"label": "Football", "value": "Football", "icon": "https://sportzon-cdn.s3.ap-south-1.amazonaws.com/Sportzon-App/Icons/football.png"  },
        {"label": "Basketball", "value": "Basketball","icon":"https://sportzon-cdn.s3.ap-south-1.amazonaws.com/Sportzon-App/Icons/basketball.png" },
        {"label": "Speed Skating", "value": "Speed Skating", "icon":"https://sportzon-cdn.s3.ap-south-1.amazonaws.com/Sportzon-App/Icons/skating.png"},
        {"label": "Table Tennis", "value": "Table Tennis", "icon":"https://sportzon-cdn.s3.ap-south-1.amazonaws.com/Sportzon-App/Icons/table+tennis.png"},],
      "activities": [
        {
          "label": "Cricket",
          "value": "Cricket"
        },
        {
          "label": "Speed Skating",
          "value": "Speed Skating"
        },
        {
          "label": "Basketball",
          "value": "Basketball"
        },
        {
          "label": "Football",
          "value": "Football"
        },
        {
          "label": "Table Tennis",
          "value": "Table Tennis"
        }
      ],
      "description": "Alliance International School in Punjab, situated at Swami Vivekanand Institute of Engineering and Technology, Vill. Ramnagar, near Banur, Teh, adjacent to Gian Sagar Medical College & Hospital, Rajpura, 140601, offers a diverse sports program featuring Cricket, Basketball, Football, Skating, and Table Tennis. The school provides facilities for these sports, emphasizing active participation. While specific details about scheduled activities are not provided, the school's commitment to a well-rounded education is evident through its sports offerings, which are planned for after-school hours.",
    },
    {
      "_id": "65146dd3831717ccf3c00a0b",
      "title": "Dharav High School, Jaipur",
      "slug": "dharav-high-school,-jaipur",
      address1: 'Vidyadhar Nagar, Jaipur, Rajasthan',
    address2:'ard No.-8, R-7 & S-3, Sector 2, Sector 6, Vidyadhar Nagar, Jaipur, Rajasthan 302039',
    image: 'https://sportzon-cdn.s3.ap-south-1.amazonaws.com/venues/1705048807423-ER6_5776.jpg',
    "gallery": [
        "https://sportzon-cdn.s3.ap-south-1.amazonaws.com/venues/1705048807423-ER6_5776.jpg",
        "https://sportzon-cdn.s3.ap-south-1.amazonaws.com/venues/1705048807520-ER6_5815.jpg",
        "https://sportzon-cdn.s3.ap-south-1.amazonaws.com/venues%2F1705048807609-ER6_5832.jpg"
      ],
    rating: 4.5,
    timings: '5:00 PM - 7:00 PM',
    amenities: [
      { "label": "Washroom",  "value": "Washroom"},
      { "label": "Drinking Water", "value": "Drinking Water"},],
    city: "Jaipur",
    state: "Rajasthan",
    sportimages: [
      {"label": "Cricket", "value": "Cricket", "icon": "https://sportzon-cdn.s3.ap-south-1.amazonaws.com/Sportzon-App/Icons/cricket.png" },
      {"label": "Football", "value": "Football", "icon": "https://sportzon-cdn.s3.ap-south-1.amazonaws.com/Sportzon-App/Icons/football.png" },
      {"label": "Basketball", "value": "Basketball", "icon":"https://sportzon-cdn.s3.ap-south-1.amazonaws.com/Sportzon-App/Icons/basketball.png" },
      {"label": "Speed Skating", "value": "Speed Skating", "icon":"https://sportzon-cdn.s3.ap-south-1.amazonaws.com/Sportzon-App/Icons/skating.png"},
      {"label": "Table Tennis", "value": "Table Tennis", "icon":"https://sportzon-cdn.s3.ap-south-1.amazonaws.com/Sportzon-App/Icons/table+tennis.png" },
      {"label": "Karate", "value": "Karate","icon":"https://sportzon-cdn.s3.ap-south-1.amazonaws.com/Sportzon-App/Icons/karate.png" },
      {"label": "Chess", "value": "Chess", "icon":"https://sportzon-cdn.s3.ap-south-1.amazonaws.com/Sportzon-App/Icons/chess.png"},
    ],
      "activities": [
        {
          "label": "Football",
          "value": "Football"
        },
        {
          "label": "Basketball",
          "value": "Basketball"
        },
        {
          "label": "Speed Skating",
          "value": "Speed Skating"
        },
        {
          "label": "Chess",
          "value": "Chess"
        },
        {
          "label": "Table Tennis",
          "value": "Table Tennis"
        },
        {
          "label": "Karate",
          "value": "Karate"
        },
        {
          "label": "Cricket",
          "value": "Cricket"
        }
      ],
      "description": "Dharavi High School in Jaipur, located at Ward No.-8, R-7 & S-3, Sector 2, Sector 6, Vidyadhar Nagar, Jaipur, Rajasthan 302039, is dedicated to fostering a holistic education through its diverse sports program. \r\nThe school provides facilities for Football, Basketball, Skating, Chess, Table Tennis, Cricket, and Karate, offering students a wide array of physical activities. With one cricket pitch featuring three nets, the school emphasizes active participation in sports, conducting sessions on weekdays for various disciplines such as Cricket, Football, Basketball, Table Tennis, Skating, and Chess. The sports program is structured both within and after school hours, contributing to a well-rounded educational experience for students.",
     
    },
    {
      "_id": "65146cfe831717ccf3c009e6",
      "title": "DPS Jaipur",
      "slug": "delhi-public-school-jaipur",
      address1: 'Hasampura, Rajasthan',
    address2:'NH 48, Bhakrota, Hasampura, Rajasthan 302026',
    image: 'https://sportzon-cdn.s3.ap-south-1.amazonaws.com/venues/1695837437601-540127aa-8283-4025-8d2e-bf71470ce12d.jpg',
    "gallery": [
        "https://sportzon-cdn.s3.ap-south-1.amazonaws.com/venues/1695837437601-540127aa-8283-4025-8d2e-bf71470ce12d.jpg",
        "https://sportzon-cdn.s3.ap-south-1.amazonaws.com/venues/1695837437602-7059c6c9-f12e-4ccf-852a-8b01f64162d7.jpg"
      ],
    rating: 4.1,
    timings: '8:00 AM - 6:30 PM',
    amenities: [
      { "label": "Washroom",  "value": "Washroom"},
      { "label": "Drinking Water", "value": "Drinking Water"},
      { "label": "Parking", "value": "Parking" },],
    city: "Jaipur",
    state: "Rajasthan",
    sportimages: [
      {"label": "Badminton", "value": "Badminton","icon":"https://sportzon-cdn.s3.ap-south-1.amazonaws.com/Sportzon-App/Icons/tennis.png"},
      {"label": "Football", "value": "Football","icon": "https://sportzon-cdn.s3.ap-south-1.amazonaws.com/Sportzon-App/Icons/football.png"  },
      {"label": "Basketball", "value": "Basketball","icon":"https://sportzon-cdn.s3.ap-south-1.amazonaws.com/Sportzon-App/Icons/basketball.png"},
      {"label": "Table Tennis", "value": "Table Tennis", "icon":"https://sportzon-cdn.s3.ap-south-1.amazonaws.com/Sportzon-App/Icons/table+tennis.png"},],
      "activities": [
        {
          "label": "Football",
          "value": "Football"
        },
        {
          "label": "Basketball",
          "value": "Basketball"
        },
        {
          "label": "Table Tennis",
          "value": "Table Tennis"
        },
        {
          "label": "Badminton",
          "value": "Badminton"
        }
      ],
      "description": "Delhi Public School Jaipur, located in Bhakrota, Hasampura, Rajasthan, offers a robust sports program with facilities for Football, Basketball, Table Tennis, and Badminton. The school features two football fields, including one Astro Turf and three natural turf surfaces, and two spaces for indoor and outdoor games. Students can actively participate in sports during and after school hours, fostering a well-rounded educational experience.",
     
    },
    {
      "_id": "65146c18831717ccf3c009c3",
      "title": "Blooming Dales International School",
      "slug": "blooming-dales-international-school",
      address1: 'Saraswati Enclave, Gurugram, Haryana',
    address2:'Block G, Street No 2, Saraswati Enclave, Gurugram, Haryana 122006',
    image: 'https://sportzon-cdn.s3.ap-south-1.amazonaws.com/venues%2F1705060196651-DaOne+%28160+of+353%29.jpg',
    "gallery": [
        "https://sportzon-cdn.s3.ap-south-1.amazonaws.com/venues%2F1695837206751-DaOne+%28389+of+508%29.jpg",
        "https://sportzon-cdn.s3.ap-south-1.amazonaws.com/venues%2F1695837206787-DaOne+%2817+of+508%29.jpg"
      ],
    rating: 4.5,
    timings: '4:30 PM - 6:30 PM',
    amenities: [
      { "label": "Washroom",  "value": "Washroom"},
      { "label": "Drinking Water", "value": "Drinking Water"},],
    city: "Sri Ganganagar",
    state: "Rajasthan",
    sportimages: [
      {"label": "Cricket", "value": "Cricket", "icon": "https://sportzon-cdn.s3.ap-south-1.amazonaws.com/Sportzon-App/Icons/cricket.png" },
      {"label": "Badminton", "value": "Badminton", "icon":"https://sportzon-cdn.s3.ap-south-1.amazonaws.com/Sportzon-App/Icons/tennis.png"  },
      {"label": "Basketball", "value": "Basketball", "icon":"https://sportzon-cdn.s3.ap-south-1.amazonaws.com/Sportzon-App/Icons/basketball.png" },
      {"label": "Table Tennis", "value": "Table Tennis", "icon":"https://sportzon-cdn.s3.ap-south-1.amazonaws.com/Sportzon-App/Icons/table+tennis.png"},],  
      "activities": [
        {
          "label": "Cricket",
          "value": "Cricket"
        },
        {
          "label": "Table Tennis",
          "value": "Table Tennis"
        },
        {
          "label": "Basketball",
          "value": "Basketball"
        },
        {
          "label": "Badminton",
          "value": "Badminton"
        }
      ],
      "description": "Blooming Dales International School in Sriganganagar, Rajasthan, and Gurugram, Haryana, prioritizes sports with facilities for Cricket, Table Tennis, Basketball, and Badminton. The school provides two dedicated spaces for sports activities, fostering a holistic approach to physical education. Students can enjoy sports from 4:30 to 6:30 PM, Monday to Saturday, both within and after school hours, promoting a well-rounded and active lifestyle.",
      
    },
    {
      "_id": "65146a3a831717ccf3c00978",
      "title": "Tattva School",
      "slug": "tattva-school",
      address1: 'Bengaluru, Karnataka',
    address2:'Survey No. 70/2, Hosapalya Kumbalgodu P.O Mysore Road, opposite Pepsi Factory, Bengaluru, Karnataka 560074',
    image: 'https://sportzon-cdn.s3.ap-south-1.amazonaws.com/venues/1695836907314-IMG_9414.jpg',
    "gallery": [
      "https://sportzon-cdn.s3.ap-south-1.amazonaws.com/venues/1695836907314-IMG_9414.jpg",
      "https://sportzon-cdn.s3.ap-south-1.amazonaws.com/venues/1695836907327-IMG_9477.jpg"
    ],
    rating: 5.0,
    timings: '3:00 PM - 4:30 PM',
    amenities: [
      { "label": "Washroom",  "value": "Washroom", },
      { "label": "Drinking Water",  "value": "Drinking Water"},],
    city: "Bengaluru",
    state: "Karnataka",
    sportimages: [
      { "label": "Football",  "value": "Football", "icon": "https://sportzon-cdn.s3.ap-south-1.amazonaws.com/Sportzon-App/Icons/football.png" },
      { "label": "Cricket",  "value": "Cricket", "icon": "https://sportzon-cdn.s3.ap-south-1.amazonaws.com/Sportzon-App/Icons/cricket.png"},],
      "activities": [{"label": "Cricket", "value": "Cricket" },
        {"label": "Football","value": "Football"}],
      "description": "\r\nTattva School in Bangalore, located near the Pepsi Factory, offers a vibrant sports program with a focus on Cricket and Football. The school features three cemented cricket pitches for students to practice and play matches. Sporting activities are scheduled from 3:00 PM to 4:30 PM, Monday to Friday, promoting an active lifestyle. The strategic location adds an industrial touch to the school's surroundings, creating a dynamic environment for holistic education.", 
    },
    {
      "_id": "651469f8831717ccf3c0096b",
      "title": "DPS Sonepat",
      "slug": "delhi-public-school-sonepat",
      address1: 'Bahalgarh,Sonipat, Haryana',
    address2:'Bahalgarh - Meerut Road, Khewra, Sonipat, Haryana 131001',
    image: 'https://sportzon-cdn.s3.ap-south-1.amazonaws.com/venues/1704954832321-IMG_4439.jpg',
    "gallery": [
        "https://sportzon-cdn.s3.ap-south-1.amazonaws.com/venues/1704954832321-IMG_4439.jpg"
      ],
    rating: 5.0,
    timings: '8:00 AM - 6:00 PM',
    amenities: [
      { "label": "Washroom",  "value": "Washroom"},
      { "label": "Drinking Water", "value": "Drinking Water"},
      { "label": "Parking", "value": "Parking" },],
    city: "Sonipat",
    state: "Haryana",
    sportimages: [
      {"label": "Cricket", "value": "Cricket", "icon": "https://sportzon-cdn.s3.ap-south-1.amazonaws.com/Sportzon-App/Icons/cricket.png"},
      {"label": "Football", "value": "Football", "icon": "https://sportzon-cdn.s3.ap-south-1.amazonaws.com/Sportzon-App/Icons/football.png"   },
      {"label": "Basketball", "value": "Basketball","icon":"https://sportzon-cdn.s3.ap-south-1.amazonaws.com/Sportzon-App/Icons/basketball.png" },],
      "activities": [
        {
          "label": "Cricket",
          "value": "Cricket"
        },
        {
          "label": "Football",
          "value": "Football"
        },
        {
          "label": "Basketball",
          "value": "Basketball"
        }
      ],
      "description": "Delhi Public School Sonepat, located at Bahalgarh - Meerut Road, Khewra, Sonipat, Haryana 131001, offers top-notch sports facilities for cricket, football, and basketball enthusiasts. The school boasts two cricket pitches, four basketball courts, and a full cricket ground with a spacious boundary of around 60 meters.\r\n\r\nWith a commitment to promoting sports within its curriculum, the school provides opportunities for in-school and after-school sports activities. The well-maintained facilities encourage students to actively participate in cricket, football, and basketball, fostering physical fitness, teamwork, and a holistic learning experience at Delhi Public School Sonepat.",
      
    },
    {
      "_id": "6514626e4928646a6fac7a05",
      "title": "The Millenium School",
      "slug": "the-millenium-school",
      address1: 'Greater Noida, Uttar Pradesh 201310',
      address2:'1, Greater Noida, Block E, Alpha I, Greater Noida, Uttar Pradesh 201310',
      image: 'https://sportzon-cdn.s3.ap-south-1.amazonaws.com/venues/1695835957665-IMG_2495.jpg',
      "gallery": [
        "https://sportzon-cdn.s3.ap-south-1.amazonaws.com/venues/1695835957665-IMG_2495.jpg",
        "https://sportzon-cdn.s3.ap-south-1.amazonaws.com/venues/1695835957676-IMG_2552.jpg",
        "https://sportzon-cdn.s3.ap-south-1.amazonaws.com/venues/1695835957707-IMG_2557.jpg",
        "https://sportzon-cdn.s3.ap-south-1.amazonaws.com/venues/1695835957739-IMG_2706.jpg"
      ],
      rating: 4.3,
      timings: '8:00 AM - 5:00 PM',
      amenities: [
        { "label": "Washroom",  "value": "Washroom"},
        { "label": "Drinking Water", "value": "Drinking Water"},],
      city: "Noida",
      state: "Uttar Pradesh",
      sportimages: [
        {"label": "Cricket", "value": "Cricket", "icon": "https://sportzon-cdn.s3.ap-south-1.amazonaws.com/Sportzon-App/Icons/cricket.png" },
        {"label": "Football", "value": "Football", "icon": "https://sportzon-cdn.s3.ap-south-1.amazonaws.com/Sportzon-App/Icons/football.png"  },
        {"label": "Badminton", "value": "Badminton","icon":"https://sportzon-cdn.s3.ap-south-1.amazonaws.com/Sportzon-App/Icons/tennis.png" },
        {"label": "Table Tennis", "value": "Table Tennis","icon":"https://sportzon-cdn.s3.ap-south-1.amazonaws.com/Sportzon-App/Icons/table+tennis.png"},],
      "activities": [
        {
          "label": "Cricket",
          "value": "Cricket"
        },
        {
          "label": "Badminton",
          "value": "Badminton"
        },
        {
          "label": "Football",
          "value": "Football"
        },
        {
          "label": "Table Tennis",
          "value": "Table Tennis"
        }
      ],
      "description": "The Millennium School Sports Complex, Greater Noida is a sports facility that offers a variety of sports and amenities for students and the community. The complex features a turf football ground, a basketball court, 1 turf net for cricket, and table tennis and badminton courts. The complex also has drinking water facilities and washrooms.\r\n\r\nThe sports complex is available to students during school hours and to the community on Wednesdays, Thursdays, and Fridays. \r\n\r\nSports available:\r\n\r\nFootball\r\nBasketball\r\nTable Tennis\r\nBadminton\r\nNumber of grounds: 1\r\n\r\nNumber of cricket nets: 1 turf net\r\n\r\nNumber of basket ball courts: 1\r\n\r\nFacilities & Amenities:\r\n\r\nDrinking water\r\nWashrooms\r\nAvailability:\r\n\r\nWednesday, Thursday, Friday\r\nPlease note that the sports complex does not have parking facilities.\r\n\r\nThe Millennium School Sports Complex is a great place for people of all ages to enjoy sports and fitness. The complex is  well-maintained and offers a variety of amenities to make your experience enjoyable.",
     
    }
  
   
];