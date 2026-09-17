import { Store } from "./data.js";

const app = document.getElementById("app");
const modalOverlay = document.getElementById("modal-overlay");
const modalSheet = document.getElementById("modal-sheet");

const state = {
  tab: "dashboard",
  filters: {
    itinerary: "all",
    suppliers: "all",
    tourismCity: "Guangzhou",
    checklist: "all",
  },
};

const TOURISM_CITIES = ["Guangzhou", "Shenzhen", "Hong Kong"];

function cityBucket(city) {
  return TOURISM_CITIES.includes(city) ? city : "Autres";
}

const ITINERARY_CATS = {
  vol: "✈️ Vol",
  hotel: "🏨 Hôtel",
  transport: "🚗 Transport",
  activite: "📍 Activité",
  repas: "🍽️ Repas",
};

const SUPPLIER_STATUS = {
  a_confirmer: "À confirmer",
  confirme: "Confirmé",
  termine: "Terminé",
  annule: "Annulé",
};

const TOURISM_CATS = {
  food: "🥟 Restos",
  drinks: "🧋 Boissons",
  dessert: "🍪 Café & Dessert",
  activite: "🎡 Activités",
  quartier: "🏘️ Quartiers",
  nature: "🏞️ Nature",
  monument: "🏛️ Monuments",
  temple: "⛩️ Temples",
  musee: "🖼️ Musées",
  shopping: "🛍️ Shopping",
  spa: "💆 Spa",
};

const PRIORITIES = { haute: "Haute", moyenne: "Moyenne", basse: "Basse" };

const CHECKLIST_CATS = {
  admin: "📄 Admin",
  bagage: "🧳 Bagage",
  app: "📱 Apps",
  achats: "🛍️ Achats Chine",
  pouch: "🏷️ Pouch",
  general: "✅ Général",
};

function escapeHtml(str) {
  return (str || "").replace(/[&<>"']/g, (c) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  }[c]));
}

function fmtDate(d) {
  if (!d) return "Date non définie";
  const date = new Date(d + "T00:00:00");
  if (isNaN(date)) return d;
  return date.toLocaleDateString("fr-FR", { weekday: "short", day: "2-digit", month: "short" });
}

function sortByDateTime(a, b) {
  const da = `${a.date || "9999"}T${a.time || "00:00"}`;
  const db = `${b.date || "9999"}T${b.time || "00:00"}`;
  return da.localeCompare(db);
}

function todayStr() {
  const d = new Date();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${m}-${day}`;
}

function dateRange(startStr, endStr) {
  const out = [];
  const start = new Date(startStr + "T00:00:00");
  const end = new Date(endStr + "T00:00:00");
  if (isNaN(start) || isNaN(end) || start > end) return out;
  const cur = new Date(start);
  while (cur <= end) {
    const m = String(cur.getMonth() + 1).padStart(2, "0");
    const day = String(cur.getDate()).padStart(2, "0");
    out.push(`${cur.getFullYear()}-${m}-${day}`);
    cur.setDate(cur.getDate() + 1);
  }
  return out;
}

/* ---------- Navigation ---------- */

function setTab(tab) {
  state.tab = tab;
  document.querySelectorAll(".tab-btn").forEach((b) => b.classList.toggle("active", b.dataset.tab === tab));
  document.querySelectorAll(".view").forEach((v) => v.classList.toggle("active", v.id === `view-${tab}`));
  document.getElementById("fab").hidden = tab === "dashboard";
  render();
}

/* ---------- Render: Dashboard ---------- */

function daysUntil(dateStr) {
  if (!dateStr) return null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(dateStr + "T00:00:00");
  return Math.round((target - today) / (1000 * 60 * 60 * 24));
}

function renderDashboard() {
  const el = document.getElementById("view-dashboard");
  const { trip, itinerary, suppliers, tourism, checklist } = Store.data;

  const diff = daysUntil(trip.startDate);
  let countdownText = "Définis les dates du voyage dans les réglages ⚙️";
  if (diff !== null) {
    if (diff > 0) countdownText = `Départ dans ${diff} jour${diff > 1 ? "s" : ""}`;
    else if (diff === 0) countdownText = "C'est le grand départ aujourd'hui !";
    else countdownText = `Voyage en cours / terminé (${trip.endDate ? "retour " + fmtDate(trip.endDate) : ""})`;
  }

  const today = todayStr();
  const todaysItinerary = [...itinerary]
    .filter((i) => i.date === today)
    .sort(sortByDateTime);
  const upcomingItinerary = [...itinerary]
    .filter((i) => !i.done && i.date > today)
    .sort(sortByDateTime)
    .slice(0, 3);

  const upcomingSuppliers = [...suppliers]
    .filter((s) => s.status !== "termine" && s.status !== "annule")
    .sort(sortByDateTime)
    .slice(0, 3);

  const visitedCount = tourism.filter((t) => t.visited).length;
  const checklistItems = checklist.filter((c) => c.category !== "achats");
  const checklistDone = checklistItems.filter((c) => c.done).length;

  el.innerHTML = `
    <div class="card" style="border-color: var(--gold-soft); margin-bottom:18px;">
      <div class="card-title" style="font-size:1.05rem;">${escapeHtml(trip.name || "Mon voyage en Chine")}</div>
      <div class="card-sub">${escapeHtml(countdownText)}</div>
    </div>

    <div class="stat-grid">
      <div class="stat-card">
        <div class="stat-value">${suppliers.length}</div>
        <div class="stat-label">Rendez-vous fournisseurs</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">${visitedCount}/${tourism.length}</div>
        <div class="stat-label">Lieux visités</div>
        <div class="progress-bar"><div style="width:${tourism.length ? (visitedCount / tourism.length) * 100 : 0}%"></div></div>
      </div>
      <div class="stat-card">
        <div class="stat-value">${itinerary.length}</div>
        <div class="stat-label">Étapes du programme</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">${checklistDone}/${checklistItems.length}</div>
        <div class="stat-label">Checklist complétée</div>
        <div class="progress-bar"><div style="width:${checklistItems.length ? (checklistDone / checklistItems.length) * 100 : 0}%"></div></div>
      </div>
    </div>

    <div class="section-title">📅 Programme du jour</div>
    ${todaysItinerary.length ? todaysItinerary.map((i) => itineraryCardHtml(i, true)).join("") : emptyState("Rien de prévu aujourd'hui.")}

    ${!todaysItinerary.length && upcomingItinerary.length ? `
      <div class="section-title">🗓️ Prochaines étapes</div>
      ${upcomingItinerary.map((i) => itineraryCardHtml(i, false)).join("")}
    ` : ""}

    <div class="section-title">🤝 Prochains rendez-vous fournisseurs</div>
    ${upcomingSuppliers.length ? upcomingSuppliers.map(supplierCardHtml).join("") : emptyState("Aucun rendez-vous planifié.")}
  `;
}

function emptyState(text) {
  return `<div class="empty-state">${escapeHtml(text)}</div>`;
}

/* ---------- Render: Itinerary ---------- */

function itineraryCardHtml(item, hideDate) {
  const catLabel = ITINERARY_CATS[item.category] || item.category;
  const subParts = [];
  if (!hideDate) subParts.push(fmtDate(item.date));
  if (item.time) subParts.push(item.time);
  if (item.city) subParts.push(escapeHtml(item.city));
  return `
    <div class="card ${item.done ? "is-done" : ""}" data-id="${item.id}" data-collection="itinerary">
      <div class="card-row">
        <input type="checkbox" class="done-checkbox" data-action="toggle-done" ${item.done ? "checked" : ""} />
        <div style="flex:1;">
          <div class="card-title">${escapeHtml(item.title)}</div>
          ${subParts.length ? `<div class="card-sub">${subParts.join(" · ")}</div>` : ""}
          ${item.location ? `<div class="card-sub">📍 ${escapeHtml(item.location)}</div>` : ""}
          ${item.notes ? `<div class="card-notes">${escapeHtml(item.notes)}</div>` : ""}
          <div class="card-meta"><span class="pill cat-${item.category}">${catLabel}</span></div>
        </div>
        <div class="card-actions">
          <button class="ghost-btn" data-action="edit">✏️</button>
          <button class="ghost-btn" data-action="delete">🗑️</button>
        </div>
      </div>
    </div>`;
}

function renderItinerary() {
  const el = document.getElementById("view-itinerary");
  const filter = state.filters.itinerary;
  let items = [...Store.data.itinerary].sort(sortByDateTime);
  if (filter !== "all") items = items.filter((i) => i.category === filter);

  const byDate = new Map();
  const noDateItems = [];
  items.forEach((item) => {
    if (!item.date) {
      noDateItems.push(item);
      return;
    }
    if (!byDate.has(item.date)) byDate.set(item.date, []);
    byDate.get(item.date).push(item);
  });

  const { trip } = Store.data;
  let dayKeys = dateRange(trip.startDate, trip.endDate);
  if (!dayKeys.length) dayKeys = [...byDate.keys()].sort();
  // include any dated items that happen to fall outside the trip range
  [...byDate.keys()].forEach((k) => {
    if (!dayKeys.includes(k)) dayKeys.push(k);
  });
  dayKeys.sort();

  const calendarHtml = dayKeys
    .map((key) => {
      const dayItems = byDate.get(key) || [];
      return `<div class="section-title">📅 ${fmtDate(key)}</div>${dayItems.length ? dayItems.map((i) => itineraryCardHtml(i, true)).join("") : emptyState("Rien de prévu ce jour.")}`;
    })
    .join("");

  const noDateHtml = noDateItems.length
    ? `<div class="section-title">🗓️ Sans date</div>${noDateItems.map((i) => itineraryCardHtml(i, true)).join("")}`
    : "";

  el.innerHTML = `
    <div class="filter-row">
      ${chip("all", "Tout", filter)}
      ${Object.entries(ITINERARY_CATS).map(([k, v]) => chip(k, v, filter)).join("")}
    </div>
    ${dayKeys.length ? calendarHtml : emptyState("Définis les dates du voyage dans les réglages pour voir le calendrier.")}
    ${noDateHtml}
  `;
  el.querySelectorAll(".chip").forEach((c) => {
    c.addEventListener("click", () => {
      state.filters.itinerary = c.dataset.value;
      renderItinerary();
    });
  });
  bindCardActions(el, "itinerary");
}

function chip(value, label, current) {
  return `<button class="chip ${current === value ? "active" : ""}" data-value="${value}">${label}</button>`;
}

/* ---------- Render: Suppliers ---------- */

function supplierCardHtml(s) {
  return `
    <div class="card" data-id="${s.id}" data-collection="suppliers">
      <div class="card-row">
        <div style="flex:1;">
          <div class="card-title">${escapeHtml(s.company)}</div>
          <div class="card-sub">${fmtDate(s.date)}${s.time ? " · " + s.time : ""}${s.city ? " · " + escapeHtml(s.city) : ""}</div>
          ${s.contact ? `<div class="card-sub">👤 ${escapeHtml(s.contact)}${s.phone ? " · " + escapeHtml(s.phone) : ""}</div>` : ""}
          ${s.location ? `<div class="card-sub">📍 ${escapeHtml(s.location)}</div>` : ""}
          ${s.products ? `<div class="card-notes"><strong>Produits :</strong> ${escapeHtml(s.products)}</div>` : ""}
          ${s.notes ? `<div class="card-notes">${escapeHtml(s.notes)}</div>` : ""}
          <div class="card-meta"><span class="pill status-${s.status}">${SUPPLIER_STATUS[s.status] || s.status}</span></div>
        </div>
        <div class="card-actions">
          <button class="ghost-btn" data-action="edit">✏️</button>
          <button class="ghost-btn" data-action="delete">🗑️</button>
        </div>
      </div>
    </div>`;
}

function renderSuppliers() {
  const el = document.getElementById("view-suppliers");
  const filter = state.filters.suppliers;
  let items = [...Store.data.suppliers].sort(sortByDateTime);
  if (filter !== "all") items = items.filter((s) => s.status === filter);

  el.innerHTML = `
    <div class="filter-row">
      ${chip("all", "Tout", filter)}
      ${Object.entries(SUPPLIER_STATUS).map(([k, v]) => chip(k, v, filter)).join("")}
    </div>
    ${items.length ? items.map(supplierCardHtml).join("") : emptyState("Aucun rendez-vous. Appuie sur + pour en ajouter.")}
  `;
  el.querySelectorAll(".chip").forEach((c) => {
    c.addEventListener("click", () => {
      state.filters.suppliers = c.dataset.value;
      renderSuppliers();
    });
  });
  bindCardActions(el, "suppliers");
}

/* ---------- Render: Tourism ---------- */

function tourismCardHtml(t, hideCity) {
  const catLabel = TOURISM_CATS[t.category] || t.category;
  const subParts = [];
  if (!hideCity && t.city) subParts.push(escapeHtml(t.city));
  if (t.address) subParts.push(escapeHtml(t.address));
  return `
    <div class="card ${t.visited ? "is-done" : ""}" data-id="${t.id}" data-collection="tourism">
      <div class="card-row">
        <input type="checkbox" class="done-checkbox" data-action="toggle-visited" ${t.visited ? "checked" : ""} />
        <div style="flex:1;">
          <div class="card-title">${escapeHtml(t.name)}</div>
          ${subParts.length ? `<div class="card-sub">${subParts.join(" · ")}</div>` : ""}
          ${t.notes ? `<div class="card-notes">${escapeHtml(t.notes)}</div>` : ""}
          <div class="card-meta">
            <span class="pill">${catLabel}</span>
            <span class="pill prio-${t.priority}">Priorité ${PRIORITIES[t.priority] || t.priority}</span>
          </div>
        </div>
        <div class="card-actions">
          <button class="ghost-btn" data-action="edit">✏️</button>
          <button class="ghost-btn" data-action="delete">🗑️</button>
        </div>
      </div>
    </div>`;
}

function renderTourism() {
  const el = document.getElementById("view-tourism");
  const city = state.filters.tourismCity;
  const cityItems = Store.data.tourism.filter((t) => cityBucket(t.city) === city);
  const hideCity = city !== "Autres";

  let groupsHtml = "";
  for (const catKey of Object.keys(TOURISM_CATS)) {
    const group = cityItems
      .filter((t) => t.category === catKey)
      .sort((a, b) => (a.visited === b.visited ? 0 : a.visited ? 1 : -1));
    if (!group.length) continue;
    groupsHtml += `<div class="section-title">${TOURISM_CATS[catKey]}</div>${group.map((t) => tourismCardHtml(t, hideCity)).join("")}`;
  }

  el.innerHTML = `
    <div class="filter-row">
      ${[...TOURISM_CITIES, "Autres"].map((c) => chip(c, c, city)).join("")}
    </div>
    ${cityItems.length ? groupsHtml : emptyState("Aucun lieu pour cette ville. Appuie sur + pour en ajouter.")}
  `;
  el.querySelectorAll(".chip").forEach((c) => {
    c.addEventListener("click", () => {
      state.filters.tourismCity = c.dataset.value;
      renderTourism();
    });
  });
  bindCardActions(el, "tourism");
}

/* ---------- Render: Checklist ---------- */

function checklistRowHtml(c) {
  return `
    <div class="card" data-id="${c.id}" data-collection="checklist">
      <div class="card-row">
        <input type="checkbox" class="done-checkbox" data-action="toggle-checked" ${c.done ? "checked" : ""} />
        <div style="flex:1;">
          <div class="card-title checklist-text ${c.done ? "is-done" : ""}">${escapeHtml(c.text)}</div>
          <div class="card-meta"><span class="pill">${CHECKLIST_CATS[c.category] || c.category}</span></div>
        </div>
        <div class="card-actions">
          <button class="ghost-btn" data-action="delete">🗑️</button>
        </div>
      </div>
    </div>`;
}

function renderChecklist() {
  const el = document.getElementById("view-checklist");
  const filter = state.filters.checklist;
  const cats = Object.entries(CHECKLIST_CATS).filter(([k]) => k !== "achats");
  let items = Store.data.checklist.filter((c) => c.category !== "achats");
  if (filter !== "all") items = items.filter((c) => c.category === filter);

  el.innerHTML = `
    <div class="filter-row">
      ${chip("all", "Tout", filter)}
      ${cats.map(([k, v]) => chip(k, v, filter)).join("")}
    </div>
    ${items.length ? items.map(checklistRowHtml).join("") : emptyState("Rien ici. Appuie sur + pour ajouter une tâche.")}
  `;
  el.querySelectorAll(".chip").forEach((c) => {
    c.addEventListener("click", () => {
      state.filters.checklist = c.dataset.value;
      renderChecklist();
    });
  });
  bindCardActions(el, "checklist");
}

function renderAchats() {
  const el = document.getElementById("view-achats");
  const items = Store.data.checklist.filter((c) => c.category === "achats");

  el.innerHTML = items.length
    ? items.map(checklistRowHtml).join("")
    : emptyState("Rien ici. Appuie sur + pour ajouter un achat.");

  bindCardActions(el, "checklist");
}

/* ---------- Shared card actions ---------- */

function bindCardActions(container, collection) {
  container.querySelectorAll(".card").forEach((cardEl) => {
    const id = cardEl.dataset.id;
    const item = Store.data[collection].find((i) => i.id === id);
    if (!item) return;

    const toggleBox = cardEl.querySelector('[data-action="toggle-done"], [data-action="toggle-visited"], [data-action="toggle-checked"]');
    if (toggleBox) {
      toggleBox.addEventListener("change", () => {
        if (collection === "itinerary") Store.updateItem(collection, id, { done: toggleBox.checked });
        if (collection === "tourism") Store.updateItem(collection, id, { visited: toggleBox.checked });
        if (collection === "checklist") Store.updateItem(collection, id, { done: toggleBox.checked });
        render();
      });
    }
    const editBtn = cardEl.querySelector('[data-action="edit"]');
    if (editBtn) editBtn.addEventListener("click", () => openModal(collection, item));

    const delBtn = cardEl.querySelector('[data-action="delete"]');
    if (delBtn)
      delBtn.addEventListener("click", () => {
        if (confirm("Supprimer cet élément ?")) {
          Store.removeItem(collection, id);
          render();
        }
      });
  });
}

/* ---------- Modal / forms ---------- */

function openModal(collection, item = null, defaultCategory = null) {
  modalOverlay.hidden = false;
  modalSheet.innerHTML = formHtml(collection, item, defaultCategory);
  modalSheet.querySelector("form").addEventListener("submit", (e) => handleFormSubmit(e, collection, item));
  modalSheet.querySelector('[data-action="close"]').addEventListener("click", closeModal);
  const cancelBtn = modalSheet.querySelector('[data-action="cancel"]');
  if (cancelBtn) cancelBtn.addEventListener("click", closeModal);
}

function closeModal() {
  modalOverlay.hidden = true;
  modalSheet.innerHTML = "";
}

function formHtml(collection, item, defaultCategory = null) {
  const isAchats = collection === "checklist" && (item?.category || defaultCategory) === "achats";
  const titles = {
    itinerary: "étape du programme",
    suppliers: "rendez-vous fournisseur",
    tourism: "lieu à visiter",
    checklist: isAchats ? "achat" : "tâche",
  };
  const heading = item ? `Modifier ${titles[collection]}` : `Ajouter ${titles[collection]}`;

  let fields = "";
  if (collection === "itinerary") {
    fields = `
      <label>Titre</label>
      <input type="text" name="title" class="full" required value="${escapeHtml(item?.title || "")}" />
      <div class="form-grid">
        <div><label>Date</label><input type="date" name="date" value="${item?.date || ""}" /></div>
        <div><label>Heure</label><input type="time" name="time" value="${item?.time || ""}" /></div>
        <div><label>Ville</label><input type="text" name="city" value="${escapeHtml(item?.city || "")}" /></div>
      </div>
      <label>Catégorie</label>
      <select name="category">${selectOptions(ITINERARY_CATS, item?.category || "activite")}</select>
      <label>Lieu / adresse</label>
      <input type="text" name="location" value="${escapeHtml(item?.location || "")}" />
      <label>Notes</label>
      <textarea name="notes">${escapeHtml(item?.notes || "")}</textarea>
    `;
  } else if (collection === "suppliers") {
    fields = `
      <label>Entreprise</label>
      <input type="text" name="company" class="full" required value="${escapeHtml(item?.company || "")}" />
      <div class="form-grid">
        <div><label>Contact</label><input type="text" name="contact" value="${escapeHtml(item?.contact || "")}" /></div>
        <div><label>Téléphone</label><input type="text" name="phone" value="${escapeHtml(item?.phone || "")}" /></div>
        <div><label>Email</label><input type="email" name="email" value="${escapeHtml(item?.email || "")}" /></div>
      </div>
      <div class="form-grid">
        <div><label>Date</label><input type="date" name="date" value="${item?.date || ""}" /></div>
        <div><label>Heure</label><input type="time" name="time" value="${item?.time || ""}" /></div>
        <div><label>Ville</label><input type="text" name="city" value="${escapeHtml(item?.city || "")}" /></div>
      </div>
      <label>Lieu (usine / showroom / adresse)</label>
      <input type="text" name="location" value="${escapeHtml(item?.location || "")}" />
      <label>Produits discutés</label>
      <input type="text" name="products" value="${escapeHtml(item?.products || "")}" />
      <label>Statut</label>
      <select name="status">${selectOptions(SUPPLIER_STATUS, item?.status || "a_confirmer")}</select>
      <label>Notes</label>
      <textarea name="notes">${escapeHtml(item?.notes || "")}</textarea>
    `;
  } else if (collection === "tourism") {
    fields = `
      <label>Nom du lieu</label>
      <input type="text" name="name" class="full" required value="${escapeHtml(item?.name || "")}" />
      <div class="form-grid">
        <div><label>Ville</label><input type="text" name="city" value="${escapeHtml(item?.city || "")}" /></div>
        <div><label>Catégorie</label><select name="category">${selectOptions(TOURISM_CATS, item?.category || "temple")}</select></div>
        <div><label>Priorité</label><select name="priority">${selectOptions(PRIORITIES, item?.priority || "moyenne")}</select></div>
      </div>
      <label>Adresse</label>
      <input type="text" name="address" value="${escapeHtml(item?.address || "")}" />
      <label>Notes</label>
      <textarea name="notes">${escapeHtml(item?.notes || "")}</textarea>
    `;
  } else if (collection === "checklist" && isAchats) {
    fields = `
      <label>Article</label>
      <input type="text" name="text" class="full" required value="${escapeHtml(item?.text || "")}" />
      <input type="hidden" name="category" value="achats" />
    `;
  } else if (collection === "checklist") {
    const catsNoAchats = {};
    Object.keys(CHECKLIST_CATS).forEach((k) => {
      if (k !== "achats") catsNoAchats[k] = CHECKLIST_CATS[k];
    });
    fields = `
      <label>Tâche</label>
      <input type="text" name="text" class="full" required value="${escapeHtml(item?.text || "")}" />
      <label>Catégorie</label>
      <select name="category">${selectOptions(catsNoAchats, item?.category || "general")}</select>
    `;
  }

  return `
    <div class="modal-header">
      <h2>${heading}</h2>
      <button class="ghost-btn" data-action="close" style="font-size:1.3rem;">✕</button>
    </div>
    <form>
      ${fields}
      <div class="form-actions">
        <button type="button" class="btn btn-secondary" data-action="cancel">Annuler</button>
        <button type="submit" class="btn btn-primary">Enregistrer</button>
      </div>
    </form>
  `;
}

function selectOptions(map, current) {
  return Object.entries(map)
    .map(([k, v]) => `<option value="${k}" ${k === current ? "selected" : ""}>${v}</option>`)
    .join("");
}

function handleFormSubmit(e, collection, existingItem) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const patch = {};
  for (const [k, v] of formData.entries()) patch[k] = v;

  if (collection === "itinerary") patch.done = existingItem?.done || false;
  if (collection === "tourism") patch.visited = existingItem?.visited || false;
  if (collection === "checklist") patch.done = existingItem?.done || false;

  if (existingItem) {
    Store.updateItem(collection, existingItem.id, patch);
  } else {
    Store.addItem(collection, patch);
  }
  closeModal();
  render();
}

/* ---------- FAB ---------- */

function handleFabClick() {
  if (state.tab === "dashboard") return;
  if (state.tab === "achats") {
    openModal("checklist", null, "achats");
    return;
  }
  openModal(state.tab);
}

/* ---------- Settings ---------- */

function openSettings() {
  modalOverlay.hidden = false;
  const { trip } = Store.data;
  modalSheet.innerHTML = `
    <div class="modal-header">
      <h2>⚙️ Réglages du voyage</h2>
      <button class="ghost-btn" data-action="close" style="font-size:1.3rem;">✕</button>
    </div>
    <div class="settings-panel">
      <form id="trip-form">
        <label>Nom du voyage</label>
        <input type="text" name="name" class="full" value="${escapeHtml(trip.name || "")}" />
        <div class="form-grid">
          <div><label>Date de départ</label><input type="date" name="startDate" value="${trip.startDate || ""}" /></div>
          <div><label>Date de retour</label><input type="date" name="endDate" value="${trip.endDate || ""}" /></div>
        </div>
        <button type="submit" class="btn btn-primary" style="width:100%; margin-bottom:14px;">Enregistrer</button>
      </form>

      <div class="settings-row">
        <span>Thème sombre</span>
        <input type="checkbox" id="theme-toggle" />
      </div>

      <hr style="border-color:var(--border); width:100%; margin:8px 0;" />

      <button class="btn btn-secondary" id="export-btn">⬇️ Exporter mes données (JSON)</button>
      <label class="btn btn-secondary" style="text-align:center; display:block;">
        ⬆️ Importer des données
        <input type="file" id="import-input" accept="application/json" style="display:none;" />
      </label>
      <button class="btn btn-danger-outline" id="reset-btn">🗑️ Réinitialiser toutes les données</button>
    </div>
  `;

  modalSheet.querySelector('[data-action="close"]').addEventListener("click", closeModal);

  modalSheet.querySelector("#trip-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    Store.data.trip = {
      name: fd.get("name"),
      startDate: fd.get("startDate"),
      endDate: fd.get("endDate"),
    };
    Store.save();
    closeModal();
    render();
  });

  const themeToggle = modalSheet.querySelector("#theme-toggle");
  themeToggle.checked = document.documentElement.dataset.theme === "dark";
  themeToggle.addEventListener("change", () => {
    const theme = themeToggle.checked ? "dark" : "light";
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("chinaTripTheme", theme);
  });

  modalSheet.querySelector("#export-btn").addEventListener("click", () => {
    const blob = new Blob([Store.exportJSON()], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "voyage-chine-pouch.json";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  });

  modalSheet.querySelector("#import-input").addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        Store.importJSON(reader.result);
        closeModal();
        render();
        alert("Données importées avec succès.");
      } catch (err) {
        alert("Fichier invalide.");
      }
    };
    reader.readAsText(file);
  });

  modalSheet.querySelector("#reset-btn").addEventListener("click", () => {
    if (confirm("Cela va supprimer toutes tes données et remettre les exemples. Continuer ?")) {
      Store.reset();
      closeModal();
      render();
    }
  });
}

/* ---------- Render dispatcher ---------- */

function render() {
  const renderers = [
    ["dashboard", renderDashboard],
    ["itinerary", renderItinerary],
    ["suppliers", renderSuppliers],
    ["tourism", renderTourism],
    ["checklist", renderChecklist],
    ["achats", renderAchats],
  ];
  renderers.forEach(([tabId, fn]) => {
    try {
      fn();
    } catch (e) {
      const el = document.getElementById("view-" + tabId);
      if (el) el.innerHTML = `<div class="empty-state">⚠️ Erreur d'affichage : ${escapeHtml(String(e?.message || e))}</div>`;
      console.error(`Render error (${tabId}):`, e);
    }
  });
  forceRepaint();
}

function forceRepaint() {
  // Works around an iOS Safari bug where dynamically injected content
  // has real layout (offsetHeight > 0, display:block) but never gets
  // painted. Element-level nudges (transform, detach/reinsert) weren't
  // enough. What DOES reliably fix it: opening the settings modal,
  // which inserts a full-viewport position:fixed overlay. So mimic
  // that exactly — insert then remove a full-viewport fixed layer to
  // force Safari to recomposite the whole screen.
  const nudge = document.createElement("div");
  nudge.style.cssText = "position:fixed;inset:0;z-index:99998;background:rgba(0,0,0,0.001);pointer-events:none;";
  document.body.appendChild(nudge);
  void nudge.offsetHeight;
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      nudge.remove();
    });
  });
}

/* ---------- Init ---------- */

function init() {
  let savedTheme = null;
  try {
    savedTheme = localStorage.getItem("chinaTripTheme");
  } catch (e) {}
  if (savedTheme) document.documentElement.dataset.theme = savedTheme;

  document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.addEventListener("click", () => setTab(btn.dataset.tab));
  });

  document.getElementById("fab").addEventListener("click", handleFabClick);
  document.getElementById("settings-btn").addEventListener("click", openSettings);
  modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  render();

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./sw.js").catch(() => {});
  }
}

window.addEventListener("error", (e) => {
  if (app && !app.dataset.jsErrorShown) {
    app.dataset.jsErrorShown = "1";
    const div = document.createElement("div");
    div.className = "card";
    div.style.borderColor = "var(--danger)";
    div.innerHTML = `<div class="card-title">⚠️ Erreur JavaScript</div><div class="card-notes">${escapeHtml(e?.message || "Erreur inconnue")}</div>`;
    app.prepend(div);
  }
});

try {
  init();
} catch (e) {
  if (app) {
    app.innerHTML = `<div class="card" style="border-color:var(--danger);"><div class="card-title">⚠️ Erreur de chargement</div><div class="card-notes">${escapeHtml(String(e?.message || e))}</div></div>`;
  }
  console.error("Init error:", e);
}

window.addEventListener("load", forceRepaint);
window.addEventListener("pageshow", forceRepaint);
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible") forceRepaint();
});
