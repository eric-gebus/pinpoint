import express, { Request, Response } from 'express';

export async function searchAttractions(req:Request,res:Response){
    const { latitude, longitude, radius, keyword } = req.query;
    if (!(latitude && longitude)) {
       res.status(404).send("Latitude and/or longitude was not provided");
       return;
    }
    const key=process.env.API_KEY!;
    const queryParamsDict: { [key: string]: string } = {
     apikey:key,
     latlong: `${latitude},${longitude}`,
     unit: "km",
     size: "50"
    };
    if (radius) queryParamsDict.radius = radius.toString();
    if (keyword) queryParamsDict.keyword = keyword.toString();
    const queryString = new URLSearchParams(queryParamsDict).toString();
    try {
     const response = await fetch(`https://app.ticketmaster.com/discovery/v2/attractions.json?${queryString}`);
     const responseJson = await response.json();
     res.setHeader("Content-Type", "application/json");
     res.send(responseJson._embedded.attractions);
    } catch (err) {
     res.setHeader("Content-Type", "application/json");
     res.send({ error: `${err}` });
    }
}

// GET localhost:3000/events/search?latitude=40.7128&longitude=74.0060&keyword=dogs
// GET localhost:3000/attractions/search?latitude=40.7128&longitude=74.0060