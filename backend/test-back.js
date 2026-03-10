import {
    allArtistesByDate,
    allScenesByName,
    allArtistesAlphabetical,
    oneArtisteById,
    oneSceneById,
    artistesBySceneId,
    artistesBySceneName,
    addOrUpdateArtiste,
    addOrUpdateScene,
    addArtiste,
    updateArtiste,
    addScene,
    updateScene,
    Userauth,
    clearAuth,
    isAuthValid
} from "../backend/backend.mjs";


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



try {

    const newScene = {
        nom: "Grande scène",
        description: "Scène principale du festival",
        localisation: "Place Saint-Martin",
        capacite: 500
    };

    const createdScene = await addScene(newScene);

    console.log("Scene ajoutée :", JSON.stringify(createdScene, null, 2));


    const newArtiste = {
        nom: "Jazz",
        prenom: "Band",
        genre: "Jazz",
        date: "2025-06-27 18:00",
        scene: createdScene.id,
        description: "Concert jazz du festival"
    };

    const createdArtiste = await addArtiste(newArtiste);

    console.log("Artiste ajouté :", JSON.stringify(createdArtiste, null, 2));


    const updatedArtiste = await updateArtiste(createdArtiste.id, {
        genre: "Jazz Fusion"
    });

    console.log("Artiste modifié :", JSON.stringify(updatedArtiste, null, 2));


    const updatedScene = await updateScene(createdScene.id, {
        capacite: 600
    });

    console.log("Scene modifiée :", JSON.stringify(updatedScene, null, 2));


} catch (e) {
    console.error(e);
}


try {

    clearAuth();

    console.log("Auth valide avant login :", isAuthValid());

    const email = "user@mmi.local";
    const password = "Azerty123!";

    await Userauth(email, password);

    console.log("Auth valide après login :", isAuthValid());

    clearAuth();

    console.log("Auth valide après logout :", isAuthValid());

} catch (e) {
    console.error("Erreur auth :", e.message);
}