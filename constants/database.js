export const FAQuestions = [
  {
    id: 1,
    question: "What is the sample question 1?",
    answer: "This is the sample answer 1.",
  },
  {
    id: 2,
    question: "What is the sample question 2?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac ante non metus interdum sollicitudin. Nullam vitae magna id nulla tincidunt tincidunt in eget arcu. Proin vitae condimentum elit. Fusce at orci neque.",
  },
  {
    id: 3,
    question: "What is the sample question 3?",
    answer:
      "Lorem ipsum fafas cxvv sfas fasj fak waek j sf a as vvsdfasfa  qweqw dasd czx askda ads",
  },
];

export const RequestScreens = ["Request\nGuidelines", "File A\nRequest"];

export const checklistQuestions = [
  {
    id: 1,
    question: "Are you currently taking any prescription medicines?",
    type: "condionalText", // answer will be entered in a text box
    conditional: { showIfYes: true }, // condition to show text input if "Yes"
  },
  {
    id: 2,
    question: "Have you taken aspirin within the last 3 days?",
    type: "yesNo", // simple yes/no question
  },
  {
    id: 3,
    question: "Have you had any vaccination within the last 4 weeks?",
    type: "yesNo",
  },

  {
    id: 4,
    question:
      "Have you received a blood transfusion within the past x months / recently?",
    type: "yesNo",
    note: "check with ace how recent",
  },
  {
    id: 5,
    question: "Have you had any surgery within the past x months / recently?",
    type: "yesNo",
    note: "check with ace how recent",
  },
  {
    id: 6,
    question: "Have you consumed alcohol within the past 12 hours?",
    type: "yesNo",
  },
  {
    id: 7,
    question: "Have you had a tattoo or piercing within the last 3 months?",
    type: "yesNo",
    note: "3 mos as per red cross , check with ace medical",
  },
  {
    id: 8,
    question: "Do you have a history of drug use?",
    type: "yesNo",
  },
  {
    id: 9,
    question: "Have you traveled outside the Philippines within the past year?",
    type: "yesNo",
  },
  {
    id: 10,
    question: "Are you pregnant or breastfeeding? (FOR FEMALES ONLY)",
    type: "yesNo",
    applicableTo: "female",
  },
  {
    id: 11,
    question: "When was your last period?",
    type: "date", // calendar date picker
    applicableTo: "female",
  },
  {
    id: 12,
    question:
      "Do you have any of the following conditions? Please check all that apply.",
    type: "dropdown", // multiple options
    options: [
      "HIV/AIDS",
      "Cancer",
      "Bleeding conditions (e.g., hemophilia)",
      "Tuberculosis",
      "Asthma",
      "Diabetes",
      "Malaria",
      "Others",
    ],
  },
];
