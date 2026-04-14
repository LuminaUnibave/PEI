import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AgendaList } from './components/AgendaList';
import { AddressSection } from './components/AddressSection';
import { ContactSection } from './components/ContactSection';
import { HeroCarousel } from './components/HeroCarousel';
import { HistoryTimeline } from './components/HistoryTimeline';
import { PreventionSection } from './components/PreventionSection';
import { AboutSection } from './components/AboutSection';
import { EventsSection } from './components/EventsSection';
import { CareCards } from './components/CareCards';
import { PublicLayout } from './layouts/PublicLayout';
import './App.css';

export default function AppRoot() {
  const basename = process.env.NODE_ENV === 'production' ? '/website' : '/';

  return (
    <BrowserRouter basename={basename}>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route
            index
            element={
              <>
                <HeroCarousel />
                <AboutSection />
                <PreventionSection />
                <EventsSection />
                <AddressSection />
                <ContactSection />
              </>
            }
          />
          <Route path="/agenda" element={<AgendaList />} />
          <Route path="/cuidados" element={<CareCards />} />
          <Route path="/historia" element={<HistoryTimeline />} />
        </Route>
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
