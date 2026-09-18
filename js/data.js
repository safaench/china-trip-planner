// Modèle de données + persistance (localStorage)

const STORAGE_KEY = "chinaTripData_v6";

function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

function defaultData() {
  return {
    trip: {
      name: "China 🇨🇳 — Pouch",
      startDate: "2026-09-25",
      endDate: "2026-10-09",
    },
    itinerary: [
      {
        id: uid(), title: "Sophia Chen (GBM)", category: "rdv",
        date: "2026-09-27", time: "", city: "Guangzhou",
        location: "À demander à Sophia (transport hôtel-usine offert par elle)",
        notes: "Visite usine + présentation sample (Vegan Suede, daim kaki). Heure à définir.",
        done: false,
      },
      {
        id: uid(), title: "Nina & Cindy", category: "rdv",
        date: "2026-09-28", time: "14:00–15:00", city: "Guangzhou",
        location: "À confirmer (rencontre café + visio atelier)",
        notes: "Présentation fournisseur + évaluation produit / capacités de production.",
        done: false,
      },
      {
        id: uid(), title: "Jay (Jay Yuan)", category: "rdv",
        date: "2026-09-29", time: "11:00–12:00", city: "Guangzhou",
        location: "No. 36, Heyun Road, Jianggao Town, Baiyun area, Guangzhou city, Guangdong Province, China.",
        notes: "Présentation fournisseur + évaluation produit / capacités de production (cuir marron).",
        done: false,
      },
      {
        id: uid(), title: "Louis (Novafulfil)", category: "rdv",
        date: "2026-10-04", time: "11:00–12:00", city: "Shenzhen",
        location: "Guangdong, Shenzhen, Longhua, Minzhi, Minzhi Community, 1970 Keji Yuan, Bldg 8, 6F, Room 610",
        notes: "Visite / rencontre + évaluation avant sélection (fulfillment, QC, logistique). Confirmé.",
        done: false,
      },
      { id: uid(), title: "✈️ Arrivée à Guangzhou", category: "vol", date: "2026-09-25", time: "18:00", city: "Guangzhou", location: "", notes: "", done: false },
      { id: uid(), title: "🚕 Transfert aéroport → hôtel + check-in", category: "transport", date: "2026-09-25", time: "18:00", city: "Guangzhou", location: "", notes: "18h00–19h30.", done: false },
      { id: uid(), title: "🍽️ Dîner", category: "repas", date: "2026-09-25", time: "20:00", city: "Guangzhou", location: "", notes: "", done: false },
      { id: uid(), title: "🌙 Repos / soirée libre", category: "activite", date: "2026-09-25", time: "21:30", city: "Guangzhou", location: "", notes: "Aucune autre activité prévue ce jour-là.", done: false },
      { id: uid(), title: "😴 Matinée tranquille / récupération du voyage", category: "activite", date: "2026-09-26", time: "08:00", city: "Guangzhou", location: "", notes: "", done: false },
      { id: uid(), title: "🛍️ Zhongda Market — sourcing textile", category: "activite", date: "2026-09-26", time: "11:00", city: "Guangzhou", location: "", notes: "11h00–14h00.", done: false },
      { id: uid(), title: "🍜 Déjeuner", category: "repas", date: "2026-09-26", time: "14:00", city: "Guangzhou", location: "", notes: "14h00–15h00.", done: false },
      { id: uid(), title: "🛍️ Zhongda / marchés textiles alentours", category: "activite", date: "2026-09-26", time: "15:00", city: "Guangzhou", location: "", notes: "15h00–17h00.", done: false },
      { id: uid(), title: "🏨 Retour hôtel / repos", category: "activite", date: "2026-09-26", time: "17:00", city: "Guangzhou", location: "", notes: "Pas de séance de sport le 26 septembre.", done: false },
      { id: uid(), title: "🍽️ Dîner — Chua Lam's Dim Sum", category: "repas", date: "2026-09-26", time: "19:30", city: "Guangzhou", location: "", notes: "", done: false },
      { id: uid(), title: "🏋️ Séance sport #1", category: "sport", date: "2026-09-27", time: "09:30", city: "Guangzhou", location: "", notes: "9h30–10h30.", done: false },
      { id: uid(), title: "🚕 Départ de l'hôtel", category: "transport", date: "2026-09-27", time: "10:30", city: "Guangzhou", location: "", notes: "", done: false },
      { id: uid(), title: "🛍️ Liuhua Wholesale Market", category: "activite", date: "2026-09-27", time: "11:00", city: "Guangzhou", location: "", notes: "11h00–12h30.", done: false },
      { id: uid(), title: "🍜 Déjeuner", category: "repas", date: "2026-09-27", time: "12:30", city: "Guangzhou", location: "", notes: "12h30–13h30.", done: false },
      { id: uid(), title: "👟 Zhanxi Road + Zhanxi Shoe Wholesale + Futian Shoes Market + Euro Commercial Plaza", category: "activite", date: "2026-09-27", time: "13:30", city: "Guangzhou", location: "", notes: "13h30–15h00.", done: false },
      { id: uid(), title: "⌚ Guangzhou Watch Market", category: "activite", date: "2026-09-27", time: "15:00", city: "Guangzhou", location: "", notes: "15h00–16h00.", done: false },
      { id: uid(), title: "⌚ Second-Hand Luxury Watch Market", category: "activite", date: "2026-09-27", time: "16:00", city: "Guangzhou", location: "", notes: "16h00–17h00.", done: false },
      { id: uid(), title: "🍽️ Dîner — Red Dragon (Jap Halal) ou Hui People", category: "repas", date: "2026-09-27", time: "19:30", city: "Guangzhou", location: "", notes: "", done: false },
      { id: uid(), title: "🏋️ Séance sport #2", category: "sport", date: "2026-09-28", time: "09:30", city: "Guangzhou", location: "", notes: "9h30–10h30.", done: false },
      { id: uid(), title: "🚕 Départ de l'hôtel", category: "transport", date: "2026-09-28", time: "10:30", city: "Guangzhou", location: "", notes: "", done: false },
      { id: uid(), title: "💄 Guangzhou Beauty Exchange Center", category: "activite", date: "2026-09-28", time: "11:00", city: "Guangzhou", location: "", notes: "11h00–12h30.", done: false },
      { id: uid(), title: "🍜 Déjeuner", category: "repas", date: "2026-09-28", time: "12:30", city: "Guangzhou", location: "", notes: "12h30–13h30.", done: false },
      { id: uid(), title: "💄 Guangzhou Xingfa Plaza", category: "activite", date: "2026-09-28", time: "15:15", city: "Guangzhou", location: "", notes: "15h15–16h45.", done: false },
      { id: uid(), title: "📱 Guangzhou Electronic Market", category: "activite", date: "2026-09-28", time: "17:00", city: "Guangzhou", location: "", notes: "17h00–18h00.", done: false },
      { id: uid(), title: "💇 Brushing — Salon L'Oréal", category: "activite", date: "2026-09-28", time: "18:30", city: "Guangzhou", location: "", notes: "18h30–19h30.", done: false },
      { id: uid(), title: "🍽️ Dîner — Dicos / Burger Plus", category: "repas", date: "2026-09-28", time: "20:00", city: "Guangzhou", location: "", notes: "", done: false },
      { id: uid(), title: "🚕 Départ de l'hôtel", category: "transport", date: "2026-09-29", time: "10:30", city: "Guangzhou", location: "", notes: "", done: false },
      { id: uid(), title: "🍜 Déjeuner", category: "repas", date: "2026-09-29", time: "12:00", city: "Guangzhou", location: "", notes: "12h00–13h30.", done: false },
      { id: uid(), title: "🛍️ Dernier passage marchés — selon les besoins restants", category: "activite", date: "2026-09-29", time: "13:30", city: "Guangzhou", location: "", notes: "13h30–15h00.", done: false },
      { id: uid(), title: "🏨 Retour hôtel + récupération des bagages", category: "activite", date: "2026-09-29", time: "15:00", city: "Guangzhou", location: "", notes: "15h00–16h00.", done: false },
      { id: uid(), title: "🚄 Train Guangzhou → Shenzhen", category: "transport", date: "2026-09-29", time: "15:00", city: "Shenzhen", location: "", notes: "Train C8017 — voir l'onglet Trains pour le détail.", done: false },
      { id: uid(), title: "🏨 Installation / nuit à Shenzhen", category: "activite", date: "2026-09-29", time: "19:00", city: "Shenzhen", location: "", notes: "", done: false },
      { id: uid(), title: "🏋️ Séance sport #3", category: "sport", date: "2026-09-30", time: "09:30", city: "Shenzhen", location: "", notes: "9h30–10h30.", done: false },
      { id: uid(), title: "Activité à définir", category: "activite", date: "2026-09-30", time: "10:45", city: "Shenzhen", location: "", notes: "Après 10h30.", done: false },
      { id: uid(), title: "🍽️ Dîner", category: "repas", date: "2026-09-30", time: "19:30", city: "Shenzhen", location: "", notes: "", done: false },
      { id: uid(), title: "☕ Temps libre", category: "activite", date: "2026-10-01", time: "08:00", city: "Shenzhen", location: "", notes: "Matin.", done: false },
      { id: uid(), title: "Activité à définir", category: "activite", date: "2026-10-01", time: "12:00", city: "Shenzhen", location: "", notes: "Journée.", done: false },
      { id: uid(), title: "🍽️ Dîner", category: "repas", date: "2026-10-01", time: "19:30", city: "Shenzhen", location: "", notes: "", done: false },
      { id: uid(), title: "🏋️ Séance sport #4", category: "sport", date: "2026-10-02", time: "09:30", city: "Shenzhen", location: "", notes: "9h30–10h30.", done: false },
      { id: uid(), title: "Activité à définir", category: "activite", date: "2026-10-02", time: "10:45", city: "Shenzhen", location: "", notes: "Après 10h30.", done: false },
      { id: uid(), title: "🍽️ Dîner", category: "repas", date: "2026-10-02", time: "19:30", city: "Shenzhen", location: "", notes: "", done: false },
      { id: uid(), title: "☕ Temps libre", category: "activite", date: "2026-10-03", time: "08:00", city: "Shenzhen", location: "", notes: "Matin.", done: false },
      { id: uid(), title: "Activité à définir", category: "activite", date: "2026-10-03", time: "12:00", city: "Shenzhen", location: "", notes: "Journée.", done: false },
      { id: uid(), title: "🍽️ Dîner", category: "repas", date: "2026-10-03", time: "19:30", city: "Shenzhen", location: "", notes: "", done: false },
      { id: uid(), title: "🧳 Check-out / préparation du départ de Shenzhen", category: "activite", date: "2026-10-04", time: "08:00", city: "Shenzhen", location: "", notes: "Matin.", done: false },
      { id: uid(), title: "🚄 Shenzhen → Hong Kong + installation à l'hôtel", category: "transport", date: "2026-10-04", time: "13:00", city: "Hong Kong", location: "", notes: "Journée.", done: false },
      { id: uid(), title: "Activité à définir", category: "activite", date: "2026-10-04", time: "14:00", city: "Hong Kong", location: "", notes: "Après-midi.", done: false },
      { id: uid(), title: "🍽️ Dîner", category: "repas", date: "2026-10-04", time: "19:30", city: "Hong Kong", location: "", notes: "", done: false },
      { id: uid(), title: "🏋️ Séance sport #5", category: "sport", date: "2026-10-05", time: "09:30", city: "Hong Kong", location: "", notes: "9h30–10h30.", done: false },
      { id: uid(), title: "Activité à définir", category: "activite", date: "2026-10-05", time: "10:45", city: "Hong Kong", location: "", notes: "Après 10h30.", done: false },
      { id: uid(), title: "🍰 Goûter / café", category: "repas", date: "2026-10-05", time: "17:30", city: "Hong Kong", location: "", notes: "", done: false },
      { id: uid(), title: "🍽️ Dîner", category: "repas", date: "2026-10-05", time: "19:30", city: "Hong Kong", location: "", notes: "", done: false },
      { id: uid(), title: "☕ Temps libre", category: "activite", date: "2026-10-06", time: "08:00", city: "Hong Kong", location: "", notes: "Matin.", done: false },
      { id: uid(), title: "Activité à définir", category: "activite", date: "2026-10-06", time: "12:00", city: "Hong Kong", location: "", notes: "Journée.", done: false },
      { id: uid(), title: "🍽️ Dîner", category: "repas", date: "2026-10-06", time: "19:30", city: "Hong Kong", location: "", notes: "", done: false },
      { id: uid(), title: "🏋️ Séance sport #6", category: "sport", date: "2026-10-07", time: "09:30", city: "Hong Kong", location: "", notes: "9h30–10h30.", done: false },
      { id: uid(), title: "Activité à définir", category: "activite", date: "2026-10-07", time: "10:45", city: "Hong Kong", location: "", notes: "Après 10h30.", done: false },
      { id: uid(), title: "🍰 Goûter / café", category: "repas", date: "2026-10-07", time: "17:30", city: "Hong Kong", location: "", notes: "", done: false },
      { id: uid(), title: "🍽️ Dîner", category: "repas", date: "2026-10-07", time: "19:30", city: "Hong Kong", location: "", notes: "", done: false },
      { id: uid(), title: "☕ Temps libre", category: "activite", date: "2026-10-08", time: "08:00", city: "Hong Kong", location: "", notes: "Matin.", done: false },
      { id: uid(), title: "Activité à définir", category: "activite", date: "2026-10-08", time: "12:00", city: "Hong Kong", location: "", notes: "Journée.", done: false },
      { id: uid(), title: "🍽️ Dîner", category: "repas", date: "2026-10-08", time: "19:30", city: "Hong Kong", location: "", notes: "", done: false },
      { id: uid(), title: "🏋️ Séance sport #7", category: "sport", date: "2026-10-09", time: "09:30", city: "Hong Kong", location: "", notes: "9h30–10h30.", done: false },
      { id: uid(), title: "🧳 Derniers préparatifs / check-out / départ", category: "activite", date: "2026-10-09", time: "10:45", city: "Hong Kong", location: "", notes: "Après 10h30.", done: false },
    ],
    suppliers: [
      {
        id: uid(), company: "Sophia Chen (GBM)", contact: "Sophia Chen", phone: "", email: "",
        date: "2026-09-27", time: "", city: "Guangzhou", location: "À demander à Sophia (transport hôtel-usine offert par elle)",
        products: "Vegan Suede, daim kaki (couleur 144)", status: "a_confirmer",
        notes: "Visite usine + présentation sample. 🟡 Heure à définir + demander adresse.",
      },
      {
        id: uid(), company: "Nina & Cindy", contact: "Nina & Cindy", phone: "", email: "",
        date: "2026-09-28", time: "14:00–15:00", city: "Guangzhou", location: "À confirmer (rencontre café + visio atelier)",
        products: "", status: "a_confirmer",
        notes: "Présentation fournisseur + évaluation produit / capacités de production. 🟡 À rencontrer.",
      },
      {
        id: uid(), company: "Jay", contact: "Jay Yuan", phone: "", email: "",
        date: "2026-09-29", time: "11:00–12:00", city: "Guangzhou", location: "No. 36, Heyun Road, Jianggao Town, Baiyun area, Guangzhou city, Guangdong Province, China.",
        products: "Cuir marron (daim noir selon satisfaction échantillon Robert)", status: "a_confirmer",
        notes: "Présentation fournisseur + évaluation produit / capacités de production. 🟡 À rencontrer.",
      },
      {
        id: uid(), company: "Aitana Liao (Market Union)", contact: "Aitana Liao", phone: "", email: "",
        date: "", time: "", city: "Guangzhou", location: "Bureau Guangzhou — adresse à demander",
        products: "", status: "a_confirmer",
        notes: "Voir swatchs + discuter possibilités (bureau, pas l'usine de Yiwu). 🟡 En attente de réponse — date proposée entre le 25 et le 29 sept, pas encore confirmée.",
      },
      {
        id: uid(), company: "Louis (Novafulfil)", contact: "Louis", phone: "", email: "",
        date: "2026-10-04", time: "11:00–12:00", city: "Shenzhen", location: "Guangdong, Shenzhen, Longhua, Minzhi, Minzhi Community, 1970 Keji Yuan, Bldg 8, 6F, Room 610",
        products: "", status: "confirme",
        notes: "Visite / rencontre + évaluation avant sélection (fulfillment, QC, logistique). 🟢 Confirmé.",
      },
      {
        id: uid(), company: "Djibril (Supply Chine)", contact: "Djibril", phone: "", email: "",
        date: "", time: "21h/22h", city: "Guangzhou", location: "À déterminer",
        products: "", status: "a_confirmer",
        notes: "Dîner à planifier un soir. Discussion transit/fulfillment + QC — ⚠️ point de vigilance : conflit d'intérêt potentiel (même acteur... — note tronquée, à compléter). 🔴 Date non fixée — échange WhatsApp en cours (volumes/flux).",
      },
      {
        id: uid(), company: "Fournisseur cadeau miroir", contact: "", phone: "", email: "",
        date: "", time: "", city: "", location: "",
        products: "Cadeau miroir", status: "a_confirmer",
        notes: "Objectif voyage : valider un fournisseur pour le cadeau miroir.",
      },
    ],
    hotels: [
      {
        id: uid(), name: "Paco Hotel (Guangzhou Tianhebei Shuiyin Road)", nameLocal: "柏高酒店(广州天河城购物中心水荫路店)",
        city: "Guangzhou", checkIn: "2026-09-25", checkOut: "2026-09-29",
        room: "", address: "Xingguang Yingjing Plaza, No. 119 Shuiyin Road, Yuexiu, Guangzhou",
        bookingNo: "1688900535733406", price: "180,24 €", status: "confirme",
        notes: "Payé — annulation gratuite avant 18:00 le 24 sept. 2026 (heure locale), ensuite frais de 45,06 €. Enregistrement après 14:00, départ avant 14:00.",
      },
      {
        id: uid(), name: "Shenzhen Moshiyaju Hotel (Luohu Mixc Branch)", nameLocal: "陌上雅居酒店(深圳罗湖东门老街店)",
        city: "Shenzhen", checkIn: "2026-09-29", checkOut: "2026-10-04",
        room: "Chambre Double Luxueuse — 2 lits simples", address: "",
        bookingNo: "", price: "", status: "confirme",
        notes: "Enregistrement après 14:00, départ avant 12:00. Repas non inclus.",
      },
      {
        id: uid(), name: "Nina Hotel Kowloon East", nameLocal: "九龍東如心酒店",
        city: "Hong Kong", checkIn: "2026-10-05", checkOut: "2026-10-09",
        room: "Chambre Supérieure — 1 lit queen size ou 2 lits simples", address: "",
        bookingNo: "", price: "", status: "confirme",
        notes: "Enregistrement après 14:00, départ avant 12:00. Repas non inclus.",
      },
    ],
    flights: [
      {
        id: uid(), flightNo: "EY 32", direction: "aller", aircraft: "Airbus A380-800",
        date: "2026-09-24", time: "10:40", arrivalDate: "2026-09-24", arrivalTime: "19:35", duration: "06h55m",
        fromAirport: "Paris — Charles de Gaulle (CDG), Terminal 1", toAirport: "Abu Dhabi — Zayed International (AUH), Terminal A",
        bookingNo: "7S48V6", ticketNo: "607-2416865540", passengers: "Mrs Safae Nouch",
        status: "confirme", notes: "Nonstop. Bagages : 7 kg cabine / 25 kg enregistré.",
      },
      {
        id: uid(), flightNo: "EY 870", direction: "aller", aircraft: "Boeing 787-9",
        date: "2026-09-24", time: "21:10", arrivalDate: "2026-09-25", arrivalTime: "09:00", duration: "07h50m",
        fromAirport: "Abu Dhabi — Zayed International (AUH), Terminal 1", toAirport: "Hong Kong (HKG), Terminal International",
        bookingNo: "7S48V6", ticketNo: "607-2416865540", passengers: "Mrs Safae Nouch",
        status: "confirme", notes: "Nonstop. Bagages : 7 kg cabine / 25 kg enregistré. Arrivée à Hong Kong.",
      },
      {
        id: uid(), flightNo: "EY 871", direction: "retour", aircraft: "Boeing 787-9",
        date: "2026-10-09", time: "20:10", arrivalDate: "2026-10-10", arrivalTime: "00:25", duration: "08h15m",
        fromAirport: "Hong Kong (HKG), Terminal International", toAirport: "Abu Dhabi — Zayed International (AUH), Terminal A",
        bookingNo: "7S48V6", ticketNo: "607-2416865540", passengers: "Mrs Safae Nouch",
        status: "confirme", notes: "Nonstop. Bagages : 7 kg cabine / 25 kg enregistré. Départ de Hong Kong.",
      },
      {
        id: uid(), flightNo: "EY 31", direction: "retour", aircraft: "Airbus A380-800",
        date: "2026-10-10", time: "02:35", arrivalDate: "2026-10-10", arrivalTime: "07:55", duration: "07h20m",
        fromAirport: "Abu Dhabi — Zayed International (AUH), Terminal A", toAirport: "Paris — Charles de Gaulle (CDG), Terminal 1",
        bookingNo: "7S48V6", ticketNo: "607-2416865540", passengers: "Mrs Safae Nouch",
        status: "confirme", notes: "Nonstop. Bagages : 7 kg cabine / 25 kg enregistré. Retour en France.",
      },
    ],
    trains: [
      {
        id: uid(), trainNo: "G6526", date: "2026-09-25", time: "17:00", duration: "48 min",
        fromStation: "Hong Kong West Kowloon (香港西九龙)", toStation: "Guangzhounan (Guangzhou Sud · 广州南)",
        gate: "Portique 4A", bookingNo: "1688902089775966", ticketNo: "EB58330527",
        passengers: "Harrou Amal — Classe Business, Voiture 16, siège 003A (billet émis)\nNOUCH SAFAE — Classe Business, Voiture 16, siège 003F (billet émis)",
        status: "confirme", notes: "",
      },
      {
        id: uid(), trainNo: "C8017", date: "2026-09-29", time: "15:00", duration: "58 min",
        fromStation: "Guangzhoudong (Guangzhou East · 广州东)", toStation: "Shenzhen (深圳)",
        gate: "Waiting room 1", bookingNo: "1688902089802681", ticketNo: "EB69882587",
        passengers: "Harrou Amal — 1ère classe, Voiture 01 (billet émis)\nNOUCH SAFAE — 1ère classe, Voiture 01 (billet émis)",
        status: "confirme", notes: "Tous les sièges sont adjacents. Total payé : 27,44 €. (Numéros de sièges non visibles sur la capture.)",
      },
    ],
    tourism: [
      // --- Food ---
      { id: uid(), name: "Info — Halal", city: "", category: "food", priority: "moyenne", visited: false, address: "", notes: "Halal se dit 清真 (qīngzhēn) en chinois — utile pour repérer les restaurants." },
      { id: uid(), name: "Hui People", city: "Guangzhou", category: "food", priority: "moyenne", visited: false, address: "", notes: "" },
      { id: uid(), name: "Chua Lam's Dim Sum", city: "Guangzhou", category: "food", priority: "moyenne", visited: false, address: "", notes: "" },
      { id: uid(), name: "Dicos", city: "Guangzhou", category: "food", priority: "basse", visited: false, address: "", notes: "Chaîne fast-food — ne prendre que le poulet." },
      { id: uid(), name: "Red Dragon (Jap Halal)", city: "Guangzhou", category: "food", priority: "haute", visited: false, address: "Shop A20, Building 1, No. 141 Xiwan Road, Liwan District, Guangzhou", notes: "Halal (清真)." },
      { id: uid(), name: "Burger Plus", city: "Guangzhou", category: "food", priority: "moyenne", visited: false, address: "", notes: "" },
      { id: uid(), name: "LN Garden Hotel", city: "Guangzhou", category: "food", priority: "moyenne", visited: false, address: "", notes: "" },
      // --- Drinks ---
      { id: uid(), name: "HunJuice", city: "", category: "drinks", priority: "moyenne", visited: false, address: "", notes: "Chaîne de jus naturels." },
      { id: uid(), name: "Eyebar", city: "Hong Kong", category: "drinks", priority: "moyenne", visited: false, address: "", notes: "Rooftop." },
      { id: uid(), name: "Cardinal Point", city: "Hong Kong", category: "drinks", priority: "moyenne", visited: false, address: "", notes: "Rooftop." },
      { id: uid(), name: "Faye", city: "Hong Kong", category: "drinks", priority: "moyenne", visited: false, address: "", notes: "Rooftop." },
      // --- Coffee & dessert ---
      { id: uid(), name: "Vission Bakery", city: "Hong Kong", category: "dessert", priority: "moyenne", visited: false, address: "", notes: "" },
      { id: uid(), name: "Winston's Coffee", city: "Hong Kong", category: "dessert", priority: "moyenne", visited: false, address: "", notes: "" },
      { id: uid(), name: "Bébé Donut", city: "Shenzhen", category: "dessert", priority: "moyenne", visited: false, address: "", notes: "" },
      // --- Activités ---
      { id: uid(), name: "Coco Park", city: "Shenzhen", category: "activite", priority: "moyenne", visited: false, address: "", notes: "Zone commerciale ouverte." },
      { id: uid(), name: "MixC World", city: "Shenzhen", category: "activite", priority: "moyenne", visited: false, address: "", notes: "Centre commercial futuriste." },
      { id: uid(), name: "Airpods Building", city: "Shenzhen", category: "activite", priority: "moyenne", visited: false, address: "", notes: "Grande bibliothèque, très esthétique." },
      { id: uid(), name: "Shenzhen Bay Park", city: "Shenzhen", category: "nature", priority: "moyenne", visited: false, address: "", notes: "Parc." },
      { id: uid(), name: "Nantou Ancient City", city: "Shenzhen", category: "quartier", priority: "haute", visited: false, address: "", notes: "Ancienne ville, très esthétique." },
      { id: uid(), name: "Dongmen Pedestrian Street", city: "Shenzhen", category: "quartier", priority: "moyenne", visited: false, address: "", notes: "Shopping, restos, vie nocturne, balade." },
      { id: uid(), name: "Window of the World", city: "Shenzhen", category: "monument", priority: "basse", visited: false, address: "", notes: "Mini monuments (Tour Eiffel, pyramides, etc.)." },
      { id: uid(), name: "Shuiwei 1368 Cultural Street", city: "Shenzhen", category: "quartier", priority: "moyenne", visited: false, address: "", notes: "Vie nocturne façon market, restos, etc." },
      { id: uid(), name: "Yunhai Angel Bay", city: "Shenzhen", category: "nature", priority: "moyenne", visited: false, address: "", notes: "Côte, plage, coucher de soleil — très beau mais à 1h/1h30 de Shenzhen." },
      { id: uid(), name: "Temple Street (Night Market)", city: "Hong Kong", category: "quartier", priority: "moyenne", visited: false, address: "", notes: "Night market." },
      // --- Spa 24h ---
      { id: uid(), name: "Yoma Spa", city: "Guangzhou", category: "spa", priority: "moyenne", visited: false, address: "", notes: "Spa 24h." },
      { id: uid(), name: "Tenz Spa", city: "Shenzhen", category: "spa", priority: "moyenne", visited: false, address: "", notes: "Spa 24h." },
      // --- Shopping : centres / marchés généralistes ---
      { id: uid(), name: "K11 Mall", city: "Guangzhou", category: "shopping", priority: "moyenne", visited: false, address: "", notes: "" },
      { id: uid(), name: "K11 Musea", city: "Hong Kong", category: "shopping", priority: "moyenne", visited: false, address: "", notes: "" },
      { id: uid(), name: "Zhongda Market", city: "Guangzhou", category: "shopping", priority: "moyenne", visited: false, address: "", notes: "De tout, plutôt B2B." },
      { id: uid(), name: "KKV", city: "", category: "shopping", priority: "basse", visited: false, address: "", notes: "Équivalent chinois d'Action." },
      { id: uid(), name: "Marchés de gros de Liuhua", city: "Guangzhou", category: "shopping", priority: "haute", visited: false, address: "", notes: "Grossistes : vêtements, cuir, contrefaçons, Beijing Lu." },
      { id: uid(), name: "Adidas", city: "", category: "shopping", priority: "basse", visited: false, address: "", notes: "" },
      { id: uid(), name: "Issey Miyake", city: "", category: "shopping", priority: "basse", visited: false, address: "", notes: "" },
      { id: uid(), name: "Kinbo Fashion Market", city: "Guangzhou", category: "shopping", priority: "moyenne", visited: false, address: "", notes: "" },
      { id: uid(), name: "Guangzhou Zhanxi (seconde main)", city: "Guangzhou", category: "shopping", priority: "moyenne", visited: false, address: "", notes: "Marché de seconde main." },
      { id: uid(), name: "Second-Hand Luxury Watch Market", city: "Guangzhou", category: "shopping", priority: "moyenne", visited: false, address: "", notes: "Montres de luxe d'occasion. Les marchés sont plutôt pour du gros — on peut parfois négocier un échantillon à l'unité, mais dire que c'est pour un achat personnel fait payer beaucoup plus cher." },
      // --- Shopping : chaussures ---
      { id: uid(), name: "Putian", city: "Putian (Fujian)", category: "shopping", priority: "haute", visited: false, address: "", notes: "Chaussures — plus grand centre de fabrication de chaussures de Chine." },
      { id: uid(), name: "Futian Shoes Market", city: "Guangzhou", category: "shopping", priority: "moyenne", visited: false, address: "", notes: "Chaussures." },
      { id: uid(), name: "Metropolis Shoes City", city: "Guangzhou", category: "shopping", priority: "moyenne", visited: false, address: "", notes: "Chaussures." },
      { id: uid(), name: "Euro Commercial Plaza", city: "Guangzhou", category: "shopping", priority: "moyenne", visited: false, address: "", notes: "Chaussures." },
      { id: uid(), name: "Zhanxi Road Shoe Wholesale Market", city: "Guangzhou", category: "shopping", priority: "moyenne", visited: false, address: "", notes: "Chaussures — vente en gros." },
      // --- Shopping : électronique ---
      { id: uid(), name: "Huaqiangbei", city: "Shenzhen", category: "shopping", priority: "haute", visited: false, address: "", notes: "Électronique." },
      { id: uid(), name: "SEG Electronics Market", city: "Shenzhen", category: "shopping", priority: "moyenne", visited: false, address: "", notes: "Électronique." },
      { id: uid(), name: "Yuanwang Digital Mall", city: "Shenzhen", category: "shopping", priority: "moyenne", visited: false, address: "", notes: "Électronique." },
      { id: uid(), name: "Guangzhou Electronic Market", city: "Guangzhou", category: "shopping", priority: "moyenne", visited: false, address: "", notes: "Électronique." },
      // --- Shopping : cosmétique & beauté ---
      { id: uid(), name: "Guangzhou Xingfa Plaza", city: "Guangzhou", category: "shopping", priority: "moyenne", visited: false, address: "", notes: "Cosmétique & beauté." },
      { id: uid(), name: "Guangzhou Beauty Exchange Center", city: "Guangzhou", category: "shopping", priority: "moyenne", visited: false, address: "", notes: "Cosmétique & beauté." },
      { id: uid(), name: "Yiwu Cosmetics Market", city: "Yiwu", category: "shopping", priority: "moyenne", visited: false, address: "", notes: "Cosmétique & beauté." },
      // --- Shopping : montres ---
      { id: uid(), name: "Guangzhou Watch Market", city: "Guangzhou", category: "shopping", priority: "basse", visited: false, address: "", notes: "Montres." },
      { id: uid(), name: "Shenzhen Watch Market", city: "Shenzhen", category: "shopping", priority: "basse", visited: false, address: "", notes: "Montres." },
      // --- Shopping : lunettes ---
      { id: uid(), name: "Danyang Optical City", city: "Danyang", category: "shopping", priority: "basse", visited: false, address: "", notes: "Lunettes." },
      { id: uid(), name: "Shenzhen Henggang Glasses Market", city: "Shenzhen", category: "shopping", priority: "basse", visited: false, address: "", notes: "Lunettes." },
      // --- Skincare ---
      { id: uid(), name: "Watsons", city: "Shenzhen", category: "shopping", priority: "basse", visited: false, address: "", notes: "Skincare." },
      { id: uid(), name: "Harmay", city: "Guangzhou", category: "shopping", priority: "basse", visited: false, address: "", notes: "Skincare." },
      // --- Salon ---
      { id: uid(), name: "Salon L'Oréal (brushing)", city: "Guangzhou", category: "activite", priority: "basse", visited: false, address: "No. 6, Zhujiang East Road, Tianhe District, Guangzhou City, Guangdong", notes: "Brushing ~15€." },
    ],
    checklist: [
      { id: uid(), text: "Batterie externe", category: "bagage", done: false },
      { id: uid(), text: "Télécharger plusieurs VPN (certains ne marchent pas, c'est aléatoire)", category: "admin", done: false },
      { id: uid(), text: "Ajouter les infos de la carte bancaire sur Alipay", category: "admin", done: false },
      { id: uid(), text: "‼️ Lier toutes les applis à Alipay (ex : Didi)", category: "admin", done: false },
      { id: uid(), text: "Prendre des captures d'écran (hôtels, billets, adresses chinoises, itinéraires) — beaucoup de sites étrangers sont inaccessibles en Chine", category: "admin", done: false },
      { id: uid(), text: "Choisir SIM chinoise ou eSIM (regarder Zéro eSIM)", category: "admin", done: false },
      { id: uid(), text: "Bilan de santé complet — Guangzhou United Family Hospital / Clifford Hospital", category: "admin", done: false },
      { id: uid(), text: "Réserver une nuit dans un bel hôtel à Shenzhen pour shooter du contenu Pouch (séries par pays : Paris, Marrakech, Montréal, Shenzhen, Hong Kong, New York)", category: "pouch", done: false },

      { id: uid(), text: "Didi (Uber & transports)", category: "app", done: false },
      { id: uid(), text: "花小猪打车 – Hua Xiao Zhu Da Che (taxi moins cher, comparer avec Didi avant de commander)", category: "app", done: false },
      { id: uid(), text: "WeChat", category: "app", done: false },
      { id: uid(), text: "Alipay", category: "app", done: false },
      { id: uid(), text: "Kuli Kuli (traduction)", category: "app", done: false },
      { id: uid(), text: "iMoney (conversion de prix)", category: "app", done: false },
      { id: uid(), text: "ChinaBiz (tips et accompagnement)", category: "app", done: false },
      { id: uid(), text: "铁路12306 (app officielle des trains)", category: "app", done: false },
      { id: uid(), text: "飞猪 – Fliggy (hôtels, trains, vols internes, tickets attractions, promos flash à prix locaux)", category: "app", done: false },
      { id: uid(), text: "Taobao", category: "app", done: false },
      { id: uid(), text: "Amap (Google Maps chinois — utile aussi pour trouver des restos halal)", category: "app", done: false },
      { id: uid(), text: "RedNote (adresses tendance)", category: "app", done: false },
      { id: uid(), text: "盒马 – Hema (supérette qualité pas cher, livraison ultra rapide : fruits, sushis, skincare, plats préparés...)", category: "app", done: false },
      { id: uid(), text: "小红书 – Xiaohongshu (recherche de sorties, mélange Google Maps + Instagram + Pinterest chinois : cafés, restos, hôtels, spas, rooftops, spots photo)", category: "app", done: false },

      { id: uid(), text: "Trépied", category: "achats", done: false },
      { id: uid(), text: "Micro iPhone (podcast)", category: "achats", done: false },
      { id: uid(), text: "Disque dur (stockage)", category: "achats", done: false },
      { id: uid(), text: "Attachable light", category: "achats", done: false },
      { id: uid(), text: "Ring light", category: "achats", done: false },
      { id: uid(), text: "Caméra Osmo Pocket", category: "achats", done: false },
      { id: uid(), text: "Acupressure Stimulating Cooling Sheet — marque Kyusoku Jikan", category: "achats", done: false },
      { id: uid(), text: "Skincare Biodance", category: "achats", done: false },
      { id: uid(), text: "Cushion makeup (éponge)", category: "achats", done: false },
    ],
  };
}

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultData();
    const parsed = JSON.parse(raw);
    // merge shallow defaults in case of older schema
    const base = defaultData();
    const savedTrip = parsed.trip || {};
    return {
      trip: {
        name: savedTrip.name || base.trip.name,
        startDate: savedTrip.startDate || base.trip.startDate,
        endDate: savedTrip.endDate || base.trip.endDate,
      },
      itinerary: Array.isArray(parsed.itinerary) ? parsed.itinerary : base.itinerary,
      suppliers: Array.isArray(parsed.suppliers) ? parsed.suppliers : base.suppliers,
      hotels: Array.isArray(parsed.hotels) ? parsed.hotels : base.hotels,
      flights: Array.isArray(parsed.flights) ? parsed.flights : base.flights,
      trains: Array.isArray(parsed.trains) ? parsed.trains : base.trains,
      tourism: Array.isArray(parsed.tourism) ? parsed.tourism : base.tourism,
      checklist: Array.isArray(parsed.checklist) ? parsed.checklist : base.checklist,
    };
  } catch (e) {
    console.error("Erreur de lecture des données locales, réinitialisation.", e);
    return defaultData();
  }
}

export const Store = {
  data: load(),

  save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data));
  },

  reset() {
    this.data = defaultData();
    this.save();
  },

  addItem(collection, item) {
    item.id = uid();
    this.data[collection].push(item);
    this.save();
    return item;
  },

  updateItem(collection, id, patch) {
    const list = this.data[collection];
    const idx = list.findIndex((i) => i.id === id);
    if (idx !== -1) {
      list[idx] = { ...list[idx], ...patch };
      this.save();
    }
  },

  removeItem(collection, id) {
    this.data[collection] = this.data[collection].filter((i) => i.id !== id);
    this.save();
  },

  exportJSON() {
    return JSON.stringify(this.data, null, 2);
  },

  importJSON(json) {
    const parsed = JSON.parse(json);
    this.data = {
      ...defaultData(),
      ...parsed,
    };
    this.save();
  },
};

export { uid };
