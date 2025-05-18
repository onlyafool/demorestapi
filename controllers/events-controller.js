import { createEvent, editEvent, deleteEvent, getAllEvents, getEventById, registerUserForEvent, unregisterUserFromEvent } from '../models/event.js';

export async function create(req, res) {
  try {
    const { title, description, address, date } = req.body;
    const image = req.file;
    
    // Validierung aller erforderlichen Felder
    const requiredFields = {
      title: 'Titel ist erforderlich.',
      description: 'Beschreibung ist erforderlich.',
      address: 'Adresse ist erforderlich.',
      date: 'Datum ist erforderlich.',

    };
    
    for (const [field, message] of Object.entries(requiredFields)) {
      if (!req.body[field] || req.body[field].trim() === '') {
        return res.status(400).json({ message });
      }
    }
    
    // Validierung des Datums
    const dateRegex = /^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}(:\d{2})?)?$/;
    if (!dateRegex.test(date)) {
      return res.status(400).json({ message: 'Datum muss im gültigen Format sein (YYYY-MM-DD oder YYYY-MM-DDThh:mm:ss).' });
    }

    // Validierung des Image  
    if (!image) {
      return res.status(400).json({ message: 'Bild ist erforderlich.' });
    }

    // Validierung des Images Mime type
    if (!image.mimetype.startsWith('image/')) { 
      return res.status(400).json({ message: 'Bild muss ein Bild sein.' });
    }

    // Validierung der Bildgröße
    if (image.size > 1024 * 1024 * 5) {
      return res.status(400).json({ message: 'Bild darf maximal 5MB groß sein.' });
    }

    const event = createEvent({ 
      title: title.trim(), 
      description: description.trim(), 
      address: address.trim(), 
      date: date.trim(),
      image: image.filename,
      user_id: req.userData.userId
    });
    
    res.status(201).json({
      message: 'Event erfolgreich erstellt.',
      id: event.id,
      title: event.title,
      description: event.description,
      address: event.address,
      date: event.date,
      image: event.image
    });
  } catch (error) {
    console.error('Fehler beim Erstellen des Events:', error);
    res.status(500).json({ message: 'Serverfehler beim Erstellen des Events.' });
  }
}

export async function edit(req, res) {
  try {
    const eventId = req.params.id;
    const { title, description, address, date } = req.body;
    const image = req.file;
    
    // Überprüfen, ob das Event existiert
    const existingEvent = getEventById(eventId);
    if (!existingEvent) {
      return res.status(404).json({ message: 'Event nicht gefunden.' });
    }
    
    // Überprüfen, ob der Benutzer der Eigentümer des Events ist
    if (existingEvent.user_id !== req.userData.userId) {
      return res.status(403).json({ message: 'Keine Berechtigung zum Bearbeiten dieses Events.' });
    }
    
    // Validierung aller erforderlichen Felder
    const requiredFields = {
      title: 'Titel ist erforderlich.',
      description: 'Beschreibung ist erforderlich.',
      address: 'Adresse ist erforderlich.',
      date: 'Datum ist erforderlich.',
    };
    
    for (const [field, message] of Object.entries(requiredFields)) {
      if (!req.body[field] || req.body[field].trim() === '') {
        return res.status(400).json({ message });
      }
    }
    
    // Validierung des Datums
    const dateRegex = /^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}(:\d{2})?)?$/;
    if (!dateRegex.test(date)) {
      return res.status(400).json({ message: 'Datum muss im gültigen Format sein (YYYY-MM-DD oder YYYY-MM-DDThh:mm:ss).' });
    }

    // Validierung des Images
    if (!image) {
      return res.status(400).json({ message: 'Bild ist erforderlich.' });
    }

    // Validierung des Images Mime type
    if (!image.mimetype.startsWith('image/')) { 
      return res.status(400).json({ message: 'Bild muss ein Bild sein.' });
    }

    // Validierung der Bildgröße
    if (image.size > 1024 * 1024 * 5) {
      return res.status(400).json({ message: 'Bild darf maximal 5MB groß sein.' });
    }
        
    const success = editEvent(eventId, { 
      title: title.trim(), 
      description: description.trim(), 
      address: address.trim(), 
      date: date.trim(),
      image: image.filename
    });
    
    const updatedEvent = getEventById(eventId);
    res.json({ 
      message: 'Event erfolgreich aktualisiert.',
      id: updatedEvent.id,
      title: updatedEvent.title,
      description: updatedEvent.description,
      address: updatedEvent.address,
      date: updatedEvent.date,
      image: updatedEvent.image
    });
  } catch (error) {
    console.error('Fehler beim Aktualisieren des Events:', error);
    res.status(500).json({ message: 'Serverfehler beim Aktualisieren des Events.' });
  }
}

export async function deleteItem(req, res) {
  try {
    const eventId = req.params.id;
    
    // Überprüfen, ob das Event existiert
    const existingEvent = getEventById(eventId);
    
    if (!existingEvent) {
      return res.status(404).json({ message: 'Event nicht gefunden.' });
    }
    
    // Überprüfen, ob der Benutzer der Eigentümer des Events ist
    if (existingEvent.user_id !== req.userData.userId) {
      return res.status(403).json({ message: 'Keine Berechtigung zum Löschen dieses Events.' });
    }
    
    const success = deleteEvent(eventId);
    
    res.json({ message: 'Event erfolgreich gelöscht.' });
  } catch (error) {
    console.error('Fehler beim Löschen des Events:', error);
    res.status(500).json({ message: 'Serverfehler beim Löschen des Events.' });
  }
}

export async function getAll(req, res) {
  try {
    const events = getAllEvents();
    
    res.json({
      message: 'Events erfolgreich abgerufen.',
      events
    });
  } catch (error) {
    console.error('Fehler beim Abrufen der Events:', error);
    res.status(500).json({ message: 'Serverfehler beim Abrufen der Events.' });
  }
}

export async function getOne(req, res) {
  try {
    const eventId = req.params.id;
    
    const event = getEventById(eventId);
    
    if (!event) {
      return res.status(404).json({ message: 'Event nicht gefunden.' });
    }
    
    res.json({
      message: 'Event erfolgreich abgerufen.',
      event
    });
  } catch (error) {
    console.error('Fehler beim Abrufen des Events:', error);
    res.status(500).json({ message: 'Serverfehler beim Abrufen des Events.' });
  }
}

export function register(req, res) {
    const eventId = req.params.id;
    const userId = req.userData.userId; // TODO: check if user is already registered for this event

    const event = getEventById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event nicht gefunden.' });
    }

    if (event.user_id === userId) {
      return res.status(400).json({ message: 'Du kannst dich nicht selbst registrieren.' });
    }

    // if (event.max_participants && event.participants.length >= event.max_participants) {
    //   return res.status(400).json({ message: 'Event ist bereits voll.' });
    // }

    const success = registerUserForEvent(eventId, userId);
    if (success) {      
      res.status(201).json({ message: 'Erfolgreich registriert.' });
    } else {
      return res.status(500).json({ message: 'Registrierung fehlgeschlagen.' });
    }

}

export function unregister(req, res) {
  const eventId = req.params.id;
  const userId = req.userData.userId;

  const event = getEventById(eventId);
  if (!event) {
    return res.status(404).json({ message: 'Event nicht gefunden.' });
  }

  if (event.user_id === userId) {
    return res.status(400).json({ message: 'Du kannst dich nicht selbst abmelden.' });
  }

  // if (event.date < new Date()) {
  //   return res.status(400).json({ message: 'Du kannst dich nicht abmelden, da das Event bereits stattgefunden hat.' });
  // }

  const success = unregisterUserFromEvent(eventId, userId);
  if (success) {
    res.status(200).json({ message: 'Erfolgreich abgemeldet.' });
  } else {
    return res.status(500).json({ message: 'Abmelden fehlgeschlagen.' });
  }
}