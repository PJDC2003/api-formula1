import fastify from "fastify";
import cors from "@fastify/cors";

const server = fastify({ logger: true });

server.register(cors, {
    origin: "*",   // qualquer origem pode acessar a api
});

const teams = [
    { id: 1, name: "Ferrari", country: "italy"},
    { id: 2, name: "Mercedes", country: "germany"},
    { id: 3, name: "Red bull", country: "austria"},
    { id: 4, name: "Mclaren", country: "uk"},
    { id: 5, name: "Aston martin", country: "uk"},
    { id: 6, name: "Alpine", country: "france"},
    { id: 7, name: "Alfa romeo", country: "italy"},
    { id: 8, name: "Alfa tauri", country: "italy"},
    { id: 9, name: "Haas", country: "usa"},
    { id: 10, name: "Williams", country: "uk"}
];

const drivers = [
    { id: 1, name: "Vettel", team: "ferrari" },
    { id: 2, name: "Leclerc", team: "ferrari" },
    { id: 3, name: "Hamilton", team: "mercedes" },
    { id: 4, name: "Bottas", team: "mercedes" },
];


server.get("/teams", async(request, response) => {     // port http://localhost:3000/teams
    response.type("application/json").code(200);
    return teams;
});

server.get("/drivers", async(request, response) => {   // port http://localhost:3000/drivers
    response.type("application/json").code(200);
    return drivers;
});

interface DriverParams{   // interface for the params
    id: string;
}

server.get<{Params: DriverParams}>("/drivers/:id", async(request, response) => {   // port http://localhost:3000/drivers/id
    const id = parseInt(request.params.id);
    const driver = drivers.find( d => d.id === id);

    if(!driver){
        response.type("application/json").code(404);
        return { message: "Driver not found"};
    } else {
        response.type("application/json").code(200);
        return { driver };
    }

});

server.listen({ port: 3000 }, () => {
    console.log("Server init on port 3000");
});