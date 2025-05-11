import express, { Request, Response } from 'express';
import EventModel from '../models/event';

const pad = (n: number) => String(n).padStart(2, '0');

function getTodayUtcRange() {
  const now = new Date();
  const year = now.getUTCFullYear();
  const month = now.getUTCMonth();
  const day = now.getUTCDate();

  const YMDUtc = `${year}-${pad(month + 1)}-${pad(day)}`;
  const startUtc = `${YMDUtc}T00:00:00Z`;
  const endUtc = `${YMDUtc}T23:59:59Z`;

  return { startUtc, endUtc };
}

function filterEvents(events: any[]) {
  const results: any[] = [];
  const eventMap: { [key: string]: any[] } = {}; // venue -> events
  
  events.forEach((event) => {
    if (!("url" in event)) return;
    let venueId = event._embedded.venues[0].id;
    if (venueId in eventMap) eventMap[venueId].push(event);
    else                     eventMap[venueId] = [event];
  });

  for (const venueEvents of Object.values(eventMap)) {
    const selectedEvent = venueEvents[0];
    if (venueEvents.length === 1) {
      results.push(selectedEvent);
      continue;
    }
    const venue = selectedEvent._embedded.venues[0];
    results.push({ ...selectedEvent, name: `Events @ ${venue.name}`, url: (venue.url || selectedEvent.url), images: (venue.images || selectedEvent.images) });
  }

  return results;
}

export async function searchEvents(req:Request,res:Response){
    const { latitude, longitude, radius, keyword } = req.body;
    if (!(latitude && longitude)) {
       res.status(404).send("Latitude and/or longitude was not provided");
       return;
    }
    const key=process.env.API_KEY!;
    const { startUtc, endUtc } = getTodayUtcRange();
    const queryParamsDict: { [key: string]: string } = {
     apikey: key,
     latlong: `${latitude},${longitude}`,
     unit: "km",
     size: "200",
     sort: "distance,asc",
     includeTBA: "no",
     includeTBD: "no",
     includeTest: "no",
     startDateTime: startUtc,
     endDateTime: endUtc
    };
    if (radius)  queryParamsDict.radius = `${radius}`;
    if (keyword) queryParamsDict.keyword = `${keyword}`;
    const queryString = new URLSearchParams(queryParamsDict).toString();
    try {
     const response = await fetch(`https://app.ticketmaster.com/discovery/v2/events.json?${queryString}`);
     const responseJson = await response.json();
     if (!(response.ok)) throw new Error(JSON.stringify(responseJson));
     const events = responseJson._embedded.events;
     const results = filterEvents(events);
     res.setHeader("Content-Type", "application/json");
     res.send(results);
    } catch (err) {
     res.setHeader("Content-Type", "application/json");
     res.statusCode = 400;
     res.send({ error: `${err}` });
    }
}

export async function favoriteEvent(req:Request,res:Response){
  const {name,id,url,image,address,distance,startDate,endDate}=req.body;
  const event=new EventModel({
    name,
    id,
    url,
    image,
    address,
    distance,
    startDate,
  })
  await event.save();
  res.json("saved meeh");
}

export async function favoriteEventList(req:Request,res:Response){
  console.log("reached server fav event");
  try {
    const favoriteEventList=await EventModel.find();
    res.setHeader("Content-Type", "application/json");
    res.send(favoriteEventList);
  } catch (err) {
    res.setHeader("Content-Type", "application/json");
    res.statusCode = 400;
    res.send({ error: `${err}` });
   }
}

export async function removeFavoriteEvent(req:Request,res:Response){
  const id=req.params.id;
  await EventModel.deleteOne({id:id});
  res.json(`deleted ${id}`);
}

// GET localhost:3000/events/search?latitude=40.7128&longitude=74.0060&keyword=dogs