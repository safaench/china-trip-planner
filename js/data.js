// Modèle de données + persistance (localStorage)

const STORAGE_KEY = "chinaTripData_v1";

function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

function defaultData() {
  return {
    trip: {
      name: "Voyage Chine — Pouch",
      startDate: "",
      endDate: "",
    },
    itinerary: [
      {
        id: uid(),
        date: "",
        time: "09:00",
        city: "Yiwu",
        title: "Exemple — Visite marché international de Yiwu",
        category: "activite",
        location: "Futian Market",
        notes: "Exemple à modifier ou supprimer.",
        done: false,
      },
    ],
    suppliers: [
      {
        id: uid(),
        company: "Exemple — Fournisseur Pouch Co.",
        contact: "M. Li",
        phone: "",
        email: "",
        date: "",
        time: "14:00",
        city: "Guangzhou",
        location: "Usine / showroom",
        products: "Pochettes coton, sacs banane",
        status: "a_confirmer",
        notes: "Exemple à modifier ou supprimer.",
      },
    ],
    tourism: [
      {
        id: uid(),
        name: "Exemple — Temple Longhua",
        city: "Shanghai",
        category: "temple",
        priority: "moyenne",
        visited: false,
        address: "",
        notes: "Exemple à modifier ou supprimer.",
      },
    ],
    checklist: [
      { id: uid(), text: "Vérifier visa / autorisation d'entrée", category: "admin", done: false },
      { id: uid(), text: "Adaptateur prise électrique + powerbank", category: "bagage", done: false },
      { id: uid(), text: "Cartes de visite Pouch", category: "pouch", done: false },
      { id: uid(), text: "VPN installé sur le téléphone", category: "admin", done: false },
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
    return {
      trip: { ...base.trip, ...(parsed.trip || {}) },
      itinerary: Array.isArray(parsed.itinerary) ? parsed.itinerary : base.itinerary,
      suppliers: Array.isArray(parsed.suppliers) ? parsed.suppliers : base.suppliers,
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
