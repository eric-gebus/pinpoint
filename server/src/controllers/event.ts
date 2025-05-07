import express, { Request, Response } from 'express';

export async function searchEvents(req:Request,res:Response){
    const { latitude, longitude, radius, keyword } = req.body;
    if (!(latitude && longitude)) {
       res.status(404).send("Latitude and/or longitude was not provided");
       return;
    }
    const key=process.env.API_KEY!;
    const queryParamsDict: { [key: string]: string } = {
     apikey: key,
     latlong: `${latitude},${longitude}`,
     unit: "km",
     size: "20",
     sort: "distance,asc"
    };
    if (radius) queryParamsDict.radius = radius.toString();
    if (keyword) queryParamsDict.keyword = keyword.toString();
    const queryString = new URLSearchParams(queryParamsDict).toString();
    try {
     const response = await fetch(`https://app.ticketmaster.com/discovery/v2/events.json?${queryString}`);
     const responseJson = await response.json();
     res.setHeader("Content-Type", "application/json");
     res.send(responseJson._embedded.events);
    } catch (err) {
     res.setHeader("Content-Type", "application/json");
     res.send({ error: `${err}` });
    }
}
