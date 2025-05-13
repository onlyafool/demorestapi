import { createEvent, editEvent, deleteEvent, getAllEvents, getEventById } from '../models/event.js';

export async function create(req, res) {
  try {
    const { title, description, address, date } = req.body;
    
    // Validierung aller erforderlichen Felder
    const requiredFields = {
      title: 'Titel ist erforderlich.',
      description: 'Beschreibung ist erforderlich.',
      address: 'Adresse ist erforderlich.',
      date: 'Datum ist erforderlich.'
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
    
    const event = createEvent({ 
      title: title.trim(), 
      description: description.trim(), 
      address: address.trim(), 
      date: date.trim(),
      user_id: req.userData.userId
    });
    
    res.status(201).json({
      message: 'Event erfolgreich erstellt.',
      id: event.id,
      title: event.title,
      description: event.description,
      address: event.address,
      date: event.date
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
      date: 'Datum ist erforderlich.'
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
    
    const success = editEvent(eventId, { 
      title: title.trim(), 
      description: description.trim(), 
      address: address.trim(), 
      date: date.trim() 
    });
    
    const updatedEvent = getEventById(eventId);
    res.json({ 
      message: 'Event erfolgreich aktualisiert.',
      id: updatedEvent.id,
      title: updatedEvent.title,
      description: updatedEvent.description,
      address: updatedEvent.address,
      date: updatedEvent.date
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
