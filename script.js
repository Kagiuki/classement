// Initialiser Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAQ3KfLc2AwVzKDjiWAOGPCsn2LJdGjWYw",
    authDomain: "classement-gambling-school.firebaseapp.com",
    databaseURL: "https://classement-gambling-school-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "classement-gambling-school",
    storageBucket: "classement-gambling-school.appspot.com",
    messagingSenderId: "186220470885",
    appId: "1:186220470885:web:ce315234b171de80751c8c",
    measurementId: "G-R26SHW2B13"
  };
  
  firebase.initializeApp(firebaseConfig);
  
  // Référence à la base de données Firebase
  const database = firebase.database();
  
  // Récupérer le formulaire et le tableau
  const participantForm = document.getElementById('participantForm');
  const leaderboardBody = document.getElementById('leaderboard').getElementsByTagName('tbody')[0];
  
  // Écouter l'événement de soumission du formulaire
  participantForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Empêcher le rechargement de la page
  
    // Récupérer les valeurs des champs du formulaire
    const pseudo = document.getElementById('pseudo').value;
    const jetons = parseInt(document.getElementById('jetons').value);
  
    // Créer un nouvel objet participant
    const participant = {
      pseudo: pseudo,
      jetons: jetons
    };
  
    // Ajouter le participant à la base de données Firebase
    database.ref('participants').push(participant);
  
    // Réinitialiser le formulaire
    participantForm.reset();
  });
  
  // Récupérer les données des participants depuis Firebase
  database.ref('participants').on('value', function(snapshot) {
    // Effacer le contenu actuel du tableau
    leaderboardBody.innerHTML = '';
  
    // Récupérer les participants dans un tableau
    const participants = [];
    snapshot.forEach(function(childSnapshot) {
      const participant = childSnapshot.val();
      participant.id = childSnapshot.key;
      participants.push(participant);
    });
  
    // Trier les participants par ordre décroissant de jetons
    participants.sort(function(a, b) {
      return b.jetons - a.jetons;
    });
  
    // Afficher les participants dans le tableau
    participants.forEach(function(participant, index) {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${index + 1}</td>
        <td><input type="text" class="pseudoInput" data-id="${participant.id}" value="${participant.pseudo}"></td>
        <td><input type="number" class="jetonsInput" data-id="${participant.id}" value="${participant.jetons}"></td>
        <td>
          <button class="saveButton" data-id="${participant.id}">Sauvegarder</button>
          <button class="deleteButton" data-id="${participant.id}">Supprimer</button>
        </td>
      `;
      leaderboardBody.appendChild(row);
    });
  
    // Ajouter un événement de clic pour les boutons de suppression
    const deleteButtons = document.getElementsByClassName('deleteButton');
    Array.from(deleteButtons).forEach(function(button) {
      button.addEventListener('click', function() {
        const participantId = this.getAttribute('data-id');
        if (confirm("Voulez-vous vraiment supprimer vos données ?")) {
          database.ref('participants').child(participantId).remove();
        }
      });
    });
  
    // Ajouter un événement de clic pour les boutons de sauvegarde
    const saveButtons = document.getElementsByClassName('saveButton');
    Array.from(saveButtons).forEach(function(button) {
      button.addEventListener('click', function() {
        const participantId = this.getAttribute('data-id');
        const pseudoInput = document.querySelector(`.pseudoInput[data-id="${participantId}"]`);
        const jetonsInput = document.querySelector(`.jetonsInput[data-id="${participantId}"]`);
  
        if (confirm("Voulez-vous vraiment sauvegarder ? Cela supprimera les données précédentes.")) {
          const updatedParticipant = {
            pseudo: pseudoInput.value,
            jetons: parseInt(jetonsInput.value)
          };
  
          database.ref('participants').child(participantId).update(updatedParticipant);
        }
      });
    });
  });
  
  // Générer le QR code
  const qrCodeDiv = document.getElementById('qrcode');
  const websiteLink = window.location.href;
  
  new QRCode(qrCodeDiv, {
  text: websiteLink,
  width: 200,
  height: 200
  });