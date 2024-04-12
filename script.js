// script.js
let participants = [];
const adminPassword = "gambling";

// Récupérer les données du localStorage s'il y en a
const storedParticipants = localStorage.getItem('participants');
if (storedParticipants) {
  participants = JSON.parse(storedParticipants);
  updateLeaderboard();
}

const participantForm = document.getElementById('participantForm');
participantForm.addEventListener('submit', addParticipant);

function addParticipant(event) {
  event.preventDefault();
  const pseudo = document.getElementById('pseudo').value;
  const jetons = parseInt(document.getElementById('jetons').value);
  participants.push({ pseudo, jetons });
  participants.sort((a, b) => b.jetons - a.jetons);
  updateLeaderboard();
  saveParticipants();
  participantForm.reset();
}

function updateLeaderboard() {
  const leaderboard = document.querySelector('#leaderboard tbody');
  leaderboard.innerHTML = '';
  participants.forEach((participant, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${index + 1}</td>
      <td><input type="text" value="${participant.pseudo}" onchange="updatePseudo(${index}, this.value)"></td>
      <td>${participant.jetons}</td>
      <td class="actions">
        <button onclick="editParticipant(${index})">Modifier</button>
        <button onclick="removeParticipant(${index})">Supprimer</button>
      </td>
    `;
    leaderboard.appendChild(row);
  });
}

function updatePseudo(index, newPseudo) {
  participants[index].pseudo = newPseudo;
  saveParticipants();
}

function editParticipant(index) {
  const newJetons = parseInt(prompt("Entrez le nouveau nombre de jetons :"));
  if (!isNaN(newJetons)) {
    participants[index].jetons = newJetons;
    participants.sort((a, b) => b.jetons - a.jetons);
    updateLeaderboard();
    saveParticipants();
  }
}

function removeParticipant(index) {
  const confirmDelete = confirm("Voulez-vous vraiment supprimer ces données ?");
  if (confirmDelete) {
    participants.splice(index, 1);
    updateLeaderboard();
    saveParticipants();
  }
}

function saveParticipants() {
  localStorage.setItem('participants', JSON.stringify(participants));
}

// Générer le QR code
const qrCodeUrl = window.location.href; // URL de votre site web
const qrCodeElement = document.getElementById('qrcode');

new QRCode(qrCodeElement, {
  text: qrCodeUrl,
  width: 200,
  height: 200,
  colorDark: '#000000',
  colorLight: '#ffffff',
  correctLevel: QRCode.CorrectLevel.H
});