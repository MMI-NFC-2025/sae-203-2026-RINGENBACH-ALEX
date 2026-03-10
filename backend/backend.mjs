import PocketBase from "pocketbase";
const pb = new PocketBase("https://sae203.alex-ringenbach.fr");

export function getImageUrl(record, field) {
    if (!record || !record[field]) {
        return null;
    }

    return pb.files.getURL(record, record[field]);
}

export function getFileUrl(record, filename) {
    if (!record || !filename) {
        return null;
    }

    return pb.files.getURL(record, filename);
}

export async function allScenesSorted() {

    const records = await pb.collection("scene").getFullList({
        sort: "nom"
    });

    return records;

}

export async function allArtistesByDate() {
    const records = await pb.collection("artiste").getFullList({
        sort: "date",
        expand: "scene"
    });
    return records;
}


export async function allScenesByName() {
    const records = await pb.collection("scene").getFullList({
        sort: "nom"
    });
    return records;
}


export async function allArtistesAlphabetical() {
    const records = await pb.collection("artiste").getFullList({
        sort: "nom",
        expand: "scene"
    });
    return records;
}


export async function oneArtisteById(id) {

    const record = await pb.collection("artiste").getOne(id, {
        expand: "scene"
    });

    return record;
}


export async function oneSceneById(id) {
    const record = await pb.collection("scene").getOne(id);
    return record;
}


export async function artistesBySceneId(sceneId) {
    const records = await pb.collection("artiste").getFullList({
        filter: `scene.id = "${sceneId}"`,
        sort: "date",
        expand: "scene"
    });
    return records;
}


export async function artistesBySceneName(sceneName) {
    const records = await pb.collection("artiste").getFullList({
        filter: `scene.nom = "${sceneName}"`,
        sort: "date",
        expand: "scene"
    });
    return records;
}


export async function addOrUpdateArtiste(data, id = null) {

    if (id) {
        return await pb.collection("artiste").update(id, data);
    }

    return await pb.collection("artiste").create(data);
}


export async function addOrUpdateScene(data, id = null) {

    if (id) {
        return await pb.collection("scene").update(id, data);
    }

    return await pb.collection("scene").create(data);
}
export async function addArtiste(data) {
    const record = await pb.collection("artiste").create(data);
    return record;
}


export async function updateArtiste(id, data) {
    const record = await pb.collection("artiste").update(id, data);
    return record;
}


export async function addScene(data) {
    const record = await pb.collection("scene").create(data);
    return record;
}


export async function updateScene(id, data) {
    const record = await pb.collection("scene").update(id, data);
    return record;
}


export async function Userauth(login, mdp) {
    return await pb.collection("users").authWithPassword(login, mdp);
}


export function clearAuth() {
    pb.authStore.clear();
}


export function isAuthValid() {
    return pb.authStore.isValid;
}

export async function addNewUser(newUser) {

    const record = await pb.collection("users").create({
        email: newUser.email,
        password: newUser.password,
        passwordConfirm: newUser.passwordConfirm,
        name: newUser.name
    });

    return record;

}
