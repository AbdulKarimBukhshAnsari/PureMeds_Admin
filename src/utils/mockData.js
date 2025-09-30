// utils/mockData.js

export const products = [
  {
    id: "1",
    productName: "Paracetamol 500mg",
    chemicalName: "Acetaminophen",
    manufacturer: "ABC Pharma Ltd.",
    price: 150,
    purpose: "Used to reduce fever and relieve mild to moderate pain.",
    sideEffects: ["Nausea", "Stomach upset", "Allergic reaction"],
    availableStock: 500,
    category: "pain-fever",
    productImage:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "2",
    productName: "Amoxicillin 250mg",
    chemicalName: "Amoxicillin Trihydrate",
    manufacturer: "HealthCare Pharma",
    price: 320,
    purpose: "An antibiotic used to treat bacterial infections.",
    sideEffects: ["Diarrhea", "Skin rash", "Headache"],
    availableStock: 300,
    category: "infections",
    productImage:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "3",
    productName: "Ibuprofen 400mg",
    chemicalName: "Ibuprofen",
    manufacturer: "MediCure Labs",
    price: 180,
    purpose: "Used to reduce inflammation, pain, and fever.",
    sideEffects: ["Heartburn", "Dizziness", "Nausea"],
    availableStock: 450,
    category: "pain-fever",
    productImage:
      "https://images.unsplash.com/photo-1511174511562-5f97f4f4e0c8?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "4",
    productName: "Azithromycin 500mg",
    chemicalName: "Azithromycin Dihydrate",
    manufacturer: "Antibiotics Plus",
    price: 350,
    purpose: "An antibiotic used to treat various bacterial infections.",
    sideEffects: ["Diarrhea", "Nausea", "Abdominal pain"],
    availableStock: 200,
    category: "infections",
    productImage:
      "https://images.unsplash.com/photo-1511988617509-a57c8a288659?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "5",
    productName: "Amlodipine 5mg",
    chemicalName: "Amlodipine Besylate",
    manufacturer: "HeartCare Pharma",
    price: 200,
    purpose: "Used to treat high blood pressure and chest pain.",
    sideEffects: ["Swelling", "Fatigue", "Flushing"],
    availableStock: 400,
    category: "heart-bp",
    productImage:
      "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "6",
    productName: "Cetirizine 10mg",
    chemicalName: "Cetirizine Hydrochloride",
    manufacturer: "Allergy Relief Inc.",
    price: 120,
    purpose: "Used to relieve allergy symptoms.",
    sideEffects: ["Drowsiness", "Dry mouth", "Fatigue"],
    availableStock: 600,
    category: "lungs-allergy",
    productImage:
      "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "7",
    productName: "Metformin 500mg",
    chemicalName: "Metformin Hydrochloride",
    manufacturer: "Diabetics Care",
    price: 250,
    purpose: "Used to control high blood sugar in type 2 diabetes.",
    sideEffects: ["Nausea", "Vomiting", "Diarrhea"],
    availableStock: 350,
    category: "hormones-diabetes",
    productImage:
      "https://images.unsplash.com/photo-1464983953574-0892a716854b?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "8",
    productName: "Omeprazole 20mg",
    chemicalName: "Omeprazole",
    manufacturer: "Digestive Health Ltd.",
    price: 160,
    purpose: "Used to treat acid reflux and stomach ulcers.",
    sideEffects: ["Headache", "Abdominal pain", "Nausea"],
    availableStock: 500,
    category: "stomach-digestion",
    productImage:
      "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "9",
    productName: "Losartan 50mg",
    chemicalName: "Losartan Potassium",
    manufacturer: "HeartCare Pharma",
    price: 230,
    purpose: "Used to treat high blood pressure.",
    sideEffects: ["Dizziness", "Back pain", "Cold symptoms"],
    availableStock: 370,
    category: "heart-bp",
    productImage:
      "https://images.unsplash.com/photo-1468071174046-657d9d351a40?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "10",
    productName: "Montelukast 10mg",
    chemicalName: "Montelukast Sodium",
    manufacturer: "RespiraMed",
    price: 210,
    purpose: "Used to prevent asthma attacks and allergies.",
    sideEffects: ["Headache", "Abdominal pain", "Cough"],
    availableStock: 420,
    category: "lungs-allergy",
    productImage:
      "https://images.unsplash.com/photo-1503457574465-494bba506b01?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "11",
    productName: "Doxycycline 100mg",
    chemicalName: "Doxycycline Hyclate",
    manufacturer: "Antibiotics Plus",
    price: 340,
    purpose: "An antibiotic used to treat bacterial infections.",
    sideEffects: ["Nausea", "Vomiting", "Photosensitivity"],
    availableStock: 210,
    category: "infections",
    productImage:
      "https://images.unsplash.com/photo-1468519411786-9921ee67e700?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "12",
    productName: "Vitamin C 500mg",
    chemicalName: "Ascorbic Acid",
    manufacturer: "VitaHealth",
    price: 90,
    purpose: "Used to prevent or treat vitamin C deficiency.",
    sideEffects: ["Stomach upset", "Diarrhea"],
    availableStock: 800,
    category: "vitamins-others",
    productImage:
      "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "13",
    productName: "Pantoprazole 40mg",
    chemicalName: "Pantoprazole Sodium",
    manufacturer: "Digestive Health Ltd.",
    price: 170,
    purpose: "Used to treat acid reflux and stomach ulcers.",
    sideEffects: ["Headache", "Diarrhea", "Nausea"],
    availableStock: 480,
    category: "stomach-digestion",
    productImage:
      "https://images.unsplash.com/photo-1467934466021-f2425d8d1273?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "14",
    productName: "Sertraline 50mg",
    chemicalName: "Sertraline Hydrochloride",
    manufacturer: "MindCare Pharma",
    price: 350,
    purpose: "Used to treat depression and anxiety disorders.",
    sideEffects: ["Nausea", "Insomnia", "Dry mouth"],
    availableStock: 150,
    category: "brain-mental",
    productImage:
      "https://images.unsplash.com/photo-1510626176961-4b57d4fbad04?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "15",
    productName: "Salbutamol Inhaler",
    chemicalName: "Salbutamol Sulfate",
    manufacturer: "RespiraMed",
    price: 400,
    purpose: "Used to relieve symptoms of asthma and COPD.",
    sideEffects: ["Tremor", "Headache", "Palpitations"],
    availableStock: 180,
    category: "lungs-allergy",
    productImage:
      "https://images.unsplash.com/photo-1510626176961-4b57d4fbad04?q=80&w=600&auto=format&fit=crop"
  }
];
