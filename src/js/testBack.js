import {
    allArtistesByDate,
    allScenesByName,
    allArtistesAlphabetical,
    oneArtisteById,
    oneSceneById,
    artistesBySceneId,
    artistesBySceneName,
    addOrUpdateArtiste,
    addOrUpdateScene
} from "../backend.mjs";


try {

    const scenes = await allScenesByName();
    console.log("Scenes triées :", JSON.stringify(scenes, null, 2));


    const artistesDate = await allArtistesByDate();
    console.log("Artistes par date :", JSON.stringify(artistesDate, null, 2));


    const artistesAlpha = await allArtistesAlphabetical();
    console.log("Artistes A-Z :", JSON.stringify(artistesAlpha, null, 2));


    if (artistesAlpha.length > 0) {

        const artiste = await oneArtisteById(artistesAlpha[0].id);
        console.log("Info artiste :", JSON.stringify(artiste, null, 2));

    }


    if (scenes.length > 0) {

        const scene = await oneSceneById(scenes[0].id);
        console.log("Info scène :", JSON.stringify(scene, null, 2));


        const artistesScene = await artistesBySceneId(scene.id);
        console.log("Artistes sur scène (ID) :", JSON.stringify(artistesScene, null, 2));


        const artistesSceneName = await artistesBySceneName(scene.nom);
        console.log("Artistes sur scène (Nom) :", JSON.stringify(artistesSceneName, null, 2));

    }


    const newScene = {
        nom: "Grande scène",
        localisation: "Place Saint-Martin",
        capacite: 500
    };

    const createdScene = await addOrUpdateScene(newScene);
    console.log("Scene ajoutée :", createdScene);


    const newArtiste = {
        nom: "Jazz",
        prenom: "Band",
        genre: "Jazz",
        date: "2025-06-27 18:00",
        scene: createdScene.id,
        description: "Concert jazz du festival"
    };

    const createdArtiste = await addOrUpdateArtiste(newArtiste);
    console.log("Artiste ajouté :", createdArtiste);


    const updatedArtiste = await addOrUpdateArtiste(
        { genre: "Jazz Fusion" },
        createdArtiste.id
    );

    console.log("Artiste modifié :", updatedArtiste);

} catch (e) {
    console.error(e);
}