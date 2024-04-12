// Référence à la collection "leaderboard" dans la base de données
const leaderboardRef = firebase.database().ref('leaderboard');

// Ajouter un joueur au classement
function addPlayer() {
  const pseudo = document.getElementById('pseudo').value;
  const jetons = parseInt(document.getElementById('jetons').value);

  if (pseudo && !isNaN(jetons)) {
    const player = { pseudo, jetons };
    leaderboardRef.push(player);
    document.getElementById('pseudo').value = '';
    document.getElementById('jetons').value = '';
  }
}

// Mettre à jour le classement en temps réel
leaderboardRef.on('value', (snapshot) => {
  const leaderboard = snapshot.val();
  updateLeaderboard(leaderboard);
});

// Fonction pour mettre à jour l'affichage du classement
function updateLeaderboard(leaderboard) {
  // Code pour mettre à jour le tableau du classement
}

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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
