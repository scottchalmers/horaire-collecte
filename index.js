async function obtenirDonnees(zone, type) {
    const DONNNEES = await fetch(`./donnees/${zone}/${type}.json`)
        .then(reponse => reponse.json())
    const DATES = DONNNEES.map(donnee => {
        return moment(donnee, "DD/MM/YYYY")
    })

    return DATES
}

async function obtenirProchaineDate(zone, type) {
    const DATE_COURANTE = moment()
    donnees = await obtenirDonnees(zone, type)
    
    let i = 0
    while (DATE_COURANTE.isAfter(donnees[i], 'day')) {
        ++i
    }

    return donnees[i]
}

function obtenirDistance(date) {
    const EST_MEME_JOURNEE = moment(date).isSame(moment(), 'day')
    if (EST_MEME_JOURNEE) {
        return ("aujourd'hui")
    }
    
    const JOURNEE_SUIVANTE = moment().add(1, 'day')
    const EST_JOURNEE_SUIVANTE = moment(date).isSame(JOURNEE_SUIVANTE, 'day')
    if (EST_JOURNEE_SUIVANTE) {
        return ("demain")
    }

    return date.fromNow()
}

async function affichageDate(zone, type) {
    donnees = await obtenirProchaineDate(zone, type)

    const AFFICHAGE = donnees.format('dddd Do MMMM')
    const DISTANCE = obtenirDistance(donnees)
    document.getElementById(`date-prochaine-${type}`).innerHTML =  `${AFFICHAGE} (${DISTANCE})`
}

async function main() {
    moment.locale('fr')

    const ZONE = 'A'

    affichageDate(ZONE, 'poubelle')
    affichageDate(ZONE, 'recyclage')
    affichageDate(ZONE, 'composte')
}

main()