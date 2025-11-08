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
      "https://images.unsplash.com/photo-1580281657521-1cdb61e3676e?q=80&w=600&auto=format&fit=crop"
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
      "https://images.unsplash.com/photo-1556679343-c7306c1976bc?q=80&w=600&auto=format&fit=crop"
  },
  // 35 MORE ITEMS BELOW
  {
    id: "16",
    productName: "Atorvastatin 20mg",
    chemicalName: "Atorvastatin Calcium",
    manufacturer: "HeartCare Pharma",
    price: 280,
    purpose: "Used to lower cholesterol and prevent heart disease.",
    sideEffects: ["Muscle pain", "Weakness", "Digestive issues"],
    availableStock: 330,
    category: "heart-bp",
    productImage:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "17",
    productName: "Levothyroxine 50mcg",
    chemicalName: "Levothyroxine Sodium",
    manufacturer: "Hormone Labs",
    price: 190,
    purpose: "Used to treat hypothyroidism.",
    sideEffects: ["Weight loss", "Insomnia", "Anxiety"],
    availableStock: 470,
    category: "hormones-diabetes",
    productImage:
      "https://images.unsplash.com/photo-1603398938378-e54eab446dde?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "18",
    productName: "Insulin Injection 100IU/ml",
    chemicalName: "Human Insulin",
    manufacturer: "Diabetics Care",
    price: 500,
    purpose: "Used to control blood sugar in diabetes.",
    sideEffects: ["Low blood sugar", "Injection site reactions"],
    availableStock: 250,
    category: "hormones-diabetes",
    productImage:
      "https://images.unsplash.com/photo-1615634260167-5a427f2f8708?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "19",
    productName: "Clarithromycin 250mg",
    chemicalName: "Clarithromycin",
    manufacturer: "Antibiotics Plus",
    price: 340,
    purpose: "Used to treat bacterial infections of the respiratory system.",
    sideEffects: ["Diarrhea", "Nausea", "Abdominal discomfort"],
    availableStock: 270,
    category: "infections",
    productImage:
      "https://images.unsplash.com/photo-1601011952177-3b38e3b1dc2a?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "20",
    productName: "Folic Acid 5mg",
    chemicalName: "Folic Acid",
    manufacturer: "VitaHealth",
    price: 100,
    purpose: "Used to treat or prevent folate deficiency.",
    sideEffects: ["Loss of appetite", "Bloating"],
    availableStock: 700,
    category: "vitamins-others",
    productImage:
      "https://images.unsplash.com/photo-1574169208507-84376144848b?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "21",
    productName: "Ranitidine 150mg",
    chemicalName: "Ranitidine Hydrochloride",
    manufacturer: "Digestive Health Ltd.",
    price: 140,
    purpose: "Used to treat stomach acid and ulcers.",
    sideEffects: ["Headache", "Constipation", "Nausea"],
    availableStock: 450,
    category: "stomach-digestion",
    productImage:
      "https://images.unsplash.com/photo-1610025488731-1c02f6be2d7c?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "22",
    productName: "Diazepam 5mg",
    chemicalName: "Diazepam",
    manufacturer: "MindCare Pharma",
    price: 300,
    purpose: "Used to treat anxiety, muscle spasms, and seizures.",
    sideEffects: ["Drowsiness", "Fatigue", "Dizziness"],
    availableStock: 220,
    category: "brain-mental",
    productImage:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "23",
    productName: "Prednisolone 10mg",
    chemicalName: "Prednisolone",
    manufacturer: "Allergy Relief Inc.",
    price: 260,
    purpose: "Used to treat allergies and inflammation.",
    sideEffects: ["Increased appetite", "Weight gain"],
    availableStock: 310,
    category: "lungs-allergy",
    productImage:
      "https://images.unsplash.com/photo-1556228578-0d85b1e5b9d3?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "24",
    productName: "Clopidogrel 75mg",
    chemicalName: "Clopidogrel Bisulfate",
    manufacturer: "HeartCare Pharma",
    price: 280,
    purpose: "Used to prevent blood clots and heart attacks.",
    sideEffects: ["Bleeding", "Rash", "Abdominal pain"],
    availableStock: 320,
    category: "heart-bp",
    productImage:
      "https://images.unsplash.com/photo-1510626176961-4b57d4fbad04?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "25",
    productName: "Iron Supplement 325mg",
    chemicalName: "Ferrous Sulfate",
    manufacturer: "VitaHealth",
    price: 110,
    purpose: "Used to treat iron deficiency anemia.",
    sideEffects: ["Constipation", "Stomach upset"],
    availableStock: 760,
    category: "vitamins-others",
    productImage:
      "https://images.unsplash.com/photo-1604586681719-65f8b5fdf338?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "26",
    productName: "Fluoxetine 20mg",
    chemicalName: "Fluoxetine Hydrochloride",
    manufacturer: "MindCare Pharma",
    price: 310,
    purpose: "Used to treat depression, panic attacks, and OCD.",
    sideEffects: ["Nausea", "Drowsiness", "Anxiety"],
    availableStock: 280,
    category: "brain-mental",
    productImage:
      "https://images.unsplash.com/photo-1612277790461-2db4b1b8c9e7?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "27",
    productName: "Hydrochlorothiazide 25mg",
    chemicalName: "Hydrochlorothiazide",
    manufacturer: "HeartCare Pharma",
    price: 200,
    purpose: "Used to treat high blood pressure and fluid retention.",
    sideEffects: ["Dizziness", "Dry mouth", "Low potassium"],
    availableStock: 350,
    category: "heart-bp",
    productImage:
      "https://images.unsplash.com/photo-1590490360182-4d8c2e8a1f19?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "28",
    productName: "Erythromycin 500mg",
    chemicalName: "Erythromycin",
    manufacturer: "Antibiotics Plus",
    price: 300,
    purpose: "Used to treat respiratory and skin infections.",
    sideEffects: ["Nausea", "Vomiting", "Abdominal cramps"],
    availableStock: 260,
    category: "infections",
    productImage:
      "https://images.unsplash.com/photo-1612277790461-2db4b1b8c9e7?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "29",
    productName: "Calcium Tablet 500mg",
    chemicalName: "Calcium Carbonate",
    manufacturer: "VitaHealth",
    price: 130,
    purpose: "Used to prevent or treat calcium deficiency.",
    sideEffects: ["Constipation", "Bloating"],
    availableStock: 850,
    category: "vitamins-others",
    productImage:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "30",
    productName: "Loratadine 10mg",
    chemicalName: "Loratadine",
    manufacturer: "Allergy Relief Inc.",
    price: 130,
    purpose: "Used to relieve allergy symptoms and hay fever.",
    sideEffects: ["Drowsiness", "Dry mouth", "Fatigue"],
    availableStock: 620,
    category: "lungs-allergy", 
    productImage:
      "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?q=80&w=600&auto=format&fit=crop"
  },
]

export const mockAlerts = [
  {
    alertID: 'CD-234',
    medicineName: 'Paracetamol',
    medicineDose: '500mg',
    manufacturer: 'ABC COMPANY',
    batchId: 'PMD-12345',
    manufacturerDate: '2025-01-01',
    expiryDate: '2026-12-12',
    qrCode:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/1200px-QR_code_for_mobile_English_Wikipedia.svg.png',
    store: 'City Medical Store',
    city: 'Lahore',
    
  },
  {
    alertID: 'CD-235',
    medicineName: 'Amoxicillin',
    medicineDose: '250mg',
    manufacturer: 'XYZ PHARMA',
    batchId: 'PMD-23456',
    manufacturerDate: '2025-02-15',
    expiryDate: '2027-02-15',
    qrCode:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/1200px-QR_code_for_mobile_English_Wikipedia.svg.png',
    store: 'Family Pharmacy',
    city: 'Karachi',
    
  },
  {
    alertID: 'CD-236',
    medicineName: 'Ciprofloxacin',
    medicineDose: '500mg',
    manufacturer: 'HEALTH PHARMA',
    batchId: 'PMD-34567',
    manufacturerDate: '2025-03-10',
    expiryDate: '2027-03-10',
    qrCode:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/1200px-QR_code_for_mobile_English_Wikipedia.svg.png',
    store: 'Medicare Pharmacy',
    city: 'Islamabad',
   
  },
  {
    alertID: 'CD-237',
    medicineName: 'Metformin',
    medicineDose: '850mg',
    manufacturer: 'DIABETES CARE',
    batchId: 'PMD-45678',
    manufacturerDate: '2025-04-20',
    expiryDate: '2027-04-20',
    qrCode:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/1200px-QR_code_for_mobile_English_Wikipedia.svg.png',
    store: 'Health Point',
    city: 'Faisalabad',
    
  },
]