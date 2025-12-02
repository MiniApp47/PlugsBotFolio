// Initialisation de la WebApp Telegram
const webApp = window.Telegram.WebApp;
webApp.ready();
// Optionnel: masquer le bouton "Back" par défaut si inutile
webApp.BackButton.hide(); 

// --- Fonction de Navigation (pour changer d'onglet) ---
function navigateTo(pageId) {
    // 1. Cacher toutes les pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });

    // 2. Afficher la page cible
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
    }

    // 3. Mettre à jour l'état actif dans la barre de navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-page') === pageId) {
            link.classList.add('active');
        }
    });
}

// --- Fonction pour lancer la vidéo dans la MiniApp ---
function playVideoInApp(videoUrl, event) {
    // Empêcher le lien de naviguer (si on a cliqué sur un <a>)
    if (event) {
        event.preventDefault();
    }

    const containerId = 'video-player-' + videoUrl.split('.')[0]; // Ex: 'video-player-Start'
    const container = document.getElementById(containerId);

    if (!container) {
        console.error('Conteneur vidéo non trouvé pour l\'ID:', containerId);
        window.open(videoUrl, '_blank'); // Ouvrir en nouvel onglet par sécurité
        return;
    }

    // Contenu HTML du lecteur vidéo
    container.innerHTML = `
        <button class="close-video-btn" onclick="closeVideo('${containerId}')">✖️</button>
        <video class="video-player" controls autoplay playsinline>
            <source src="${videoUrl}" type="video/mp4">
            Votre navigateur ne supporte pas la vidéo.
        </video>
    `;

    // Afficher le conteneur
    container.style.display = 'block';

    // Optionnel: Scroller vers le lecteur pour le rendre visible
    container.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// --- Fonction pour fermer la vidéo ---
function closeVideo(containerId) {
    const container = document.getElementById(containerId);

    if (container) {
        // 1. Trouver l'élément vidéo et l'arrêter
        const videoElement = container.querySelector('video');
        if (videoElement) {
            videoElement.pause();
            videoElement.currentTime = 0;
        }

        // 2. Cacher le conteneur et vider son contenu
        container.style.display = 'none';
        container.innerHTML = '';
    }
}

// --- Fonction pour ouvrir une image en grand ---
function openImage(imageUrl) {
    window.open(imageUrl, '_blank');
}

// --- Fonction pour afficher le Flyer (Mise à jour pour Formules) ---
function showFlyer(formulaKey) {
    const flyerDisplay = document.getElementById('flyer-display');
    
    // Définir les liens des flyers (À REMPLACER PAR VOS VRAIS LIENS HTTPS)
    const flyers = {
        'basic': 'FormuleBasic.jpg',
        'premium': 'FormulePremium.jpg',
        'ultra-full': 'FomuleUltra.jpg',
        'sur-devis': 'FormuleSurDevis.jpg'
    };

    // Définir les liens des images secondaires/détails (À AJOUTER)
    // IMPORTANT : Si vous n'avez pas de deuxième image pour une formule, utilisez null ou une chaîne vide.
    const details = {
        'basic': 'DetailBasic.jpg', // Remplacer par le lien de la deuxième image BASIC
        'premium': 'DetailPremium.jpg', // Remplacer par le lien de la deuxième image PREMIUM
        'ultra-full': 'DetailUltra.jpg', // Remplacer par le lien de la deuxième image ULTRA
        'sur-devis': 'DetailSurDevis.jpg' // Pas d'image secondaire pour "SUR DEVIS"
    };
    
    // Définir les descriptions des formules (Optionnel: pour le texte sous le titre)
    const descriptions = {
        'basic': '🥉 Idéal pour le démarrage d\'une boutique simple. 🥉 <br><br> Intègre le système de catégories/produits.',
        'premium': '🥈 Le pack le plus populaire. 🥈 <br><br> Intègre toutes les fonctionnalités de base + le panier et un design avancé.',
        'ultra-full': '🥇 Solution tout-en-un sur mesure.  🥇 <br><br> Accès à toutes les fonctionnalités et au développement personnalisé (ex: message pré-fait).',
        'sur-devis': '🏅 Pour les projets spécifiques, complexes ou les besoins n’entrant pas dans les packs standards. 🏅'
    };

    const formulaName = formulaKey.toUpperCase().replace('-', ' ');

    // Construction du bloc de la deuxième image si elle existe
    let secondImageHTML = '';
    const detailImageUrl = details[formulaKey];
    
    if (detailImageUrl) {
        secondImageHTML = `
            <h5 style="color: var(--tg-theme-link-color); margin-top: 20px;">Détails & Exemples</h5>
            <img src="${detailImageUrl}" 
                 alt="Détails ${formulaName}" 
                 style="width: 100%; height: 48vh; object-fit: cover; border-radius: 10px; cursor: pointer; margin-top: 10px;"
                 onclick="window.open('${detailImageUrl}', '_blank')">
        `;
    }


    if (flyers[formulaKey]) {
        flyerDisplay.innerHTML = `
            <div style="background-color: var(--tg-theme-secondary-bg-color); padding: 15px; border-radius: 10px;">
                <h4 style="color: var(--tg-theme-link-color)">ⓘ Détail du ${formulaName} ⓘ</h4>
                <p style="color: var(--tg-theme-text-color); font-size: 12px;">${descriptions[formulaKey] || ''}</p>
                
                <img id="current-flyer-img" 
                     src="${flyers[formulaKey]}" 
                     alt="Flyer ${formulaName}" 
                     style="width: 100%; height: 40vh; object-fit: contain; border-radius: 10px; cursor: pointer; margin-top: 10px;">
                
                ${secondImageHTML}
                
            </div>
        `;
        // Ré-attache la fonction pour ouvrir en grand (Première image)
        document.getElementById('current-flyer-img').addEventListener('click', () => {
             window.open(flyers[formulaKey], '_blank'); 
        });
        
    } else {
        flyerDisplay.innerHTML = '<p style="text-align: center; margin-top: 20px;">Flyer non trouvé.</p>';
    }
    flyerDisplay.scrollIntoView({ behavior: 'smooth' });
}

// NOTE : Le reste des fonctions (navigateTo, DOMContentLoaded, etc.) 
// reste inchangé par rapport à la réponse précédente.


// --- Initialisation au chargement de la page ---
document.addEventListener('DOMContentLoaded', () => {
    // Rendre les liens de la navbar navigables
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            const pageId = e.currentTarget.getAttribute('data-page');
            navigateTo(pageId);
        });
    });
    
    // Initialiser la navigation sur la page HOME
    navigateTo('home');
});

/* // Applique le thème de couleurs Telegram
webApp.onEvent('themeChanged', function() {
    // Recharger la page ou simplement mettre à jour les variables CSS si nécessaire
    document.body.style.backgroundColor = webApp.themeParams.bg_color;
    // ... d'autres mises à jour de style
}); */