import type { ReactNode } from "react";

interface AmenitiesGridProps {
  amenities: string[];
}

/**
 * Inline SVG components for each amenity.
 * Uses simple, recognizable icons with accessible labels.
 */
function WifiIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12.5a9 9 0 0114 0" /><path d="M8.5 16a5.5 5.5 0 017 0" /><circle cx="12" cy="19" r="1" fill="currentColor" />
    </svg>
  );
}

function PoolIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2 20c2-1.5 4-1.5 6 0s4 1.5 6 0 4-1.5 6 0" /><path d="M2 16c2-1.5 4-1.5 6 0s4 1.5 6 0 4-1.5 6 0" /><path d="M8 12V4" /><path d="M16 12V4" /><path d="M10 4h4" /><path d="M6 8h12" />
    </svg>
  );
}

function KitchenIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 2L6 22" /><path d="M18 2L18 10" /><rect x="2" y="10" width="20" height="12" rx="2" /><path d="M10 14L14 14" /><path d="M10 18L14 18" />
    </svg>
  );
}

function AirConIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="12" rx="2" /><path d="M12 14v8" /><path d="M8 18h8" /><path d="M6 6h12" /><path d="M6 10h12" />
    </svg>
  );
}

function ParkingIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="3" /><path d="M10 16V8h3a3 3 0 010 6h-3" />
    </svg>
  );
}

function OceanViewIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2 16c2-2 4-2 6 0s4 2 6 0 4-2 6 0" /><path d="M2 20c2-2 4-2 6 0s4 2 6 0 4-2 6 0" /><path d="M2 12c2-2 4-2 6 0s4 2 6 0 4-2 6 0" /><path d="M12 2v10" />
    </svg>
  );
}

function LakeViewIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2 18c2-1.5 4-1.5 6 0s4 1.5 6 0 4-1.5 6 0" /><path d="M2 14c2-1.5 4-1.5 6 0s4 1.5 6 0 4-1.5 6 0" /><path d="M12 2v12" /><path d="M9 5l3-3 3 3" />
    </svg>
  );
}

function MountainViewIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 22L12 6L20 22" /><path d="M9 22L12 14L15 22" /><path d="M2 22L22 22" />
    </svg>
  );
}

function GardenIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 2v20" /><path d="M12 6c-2 0-4 2-4 4h8c0-2-2-4-4-4z" /><path d="M8 14c0 2 1.5 4 4 4s4-2 4-4" /><path d="M6 18c-1 0-2 1-2 2" /><path d="M18 18c1 0 2 1 2 2" />
    </svg>
  );
}

function HotTubIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="12" width="20" height="10" rx="2" /><path d="M6 12V8c0-3 2-4 6-4s6 1 6 4v4" /><path d="M8 8l0 0" /><path d="M12 6l0 0" /><path d="M16 8l0 0" />
    </svg>
  );
}

function FireplaceIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 2C10 6 8 8 8 11c0 2.2 1.8 4 4 4s4-1.8 4-4c0-3-2-5-4-9z" /><path d="M8 15c0 2 1.5 3 4 3s4-1 4-3" /><rect x="4" y="18" width="16" height="4" rx="1" />
    </svg>
  );
}

function PetFriendlyIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="7" cy="10" r="2" /><circle cx="17" cy="10" r="2" /><path d="M5 16c.5-1.5 2-3 7-3s6.5 1.5 7 3" /><path d="M12 13v5" /><path d="M8 18h8" />
    </svg>
  );
}

function SmartTVIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="4" width="20" height="12" rx="2" /><path d="M10 16l-2 4" /><path d="M14 16l2 4" /><path d="M8 20h8" />
    </svg>
  );
}

function WasherIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="2" width="18" height="20" rx="2" /><circle cx="12" cy="10" r="4" /><path d="M7 20h10" /><path d="M17 4h1" /><path d="M20 4h0" />
    </svg>
  );
}

function DryerIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="2" width="18" height="20" rx="2" /><circle cx="12" cy="10" r="4" /><path d="M9 18l6-6" />
    </svg>
  );
}

function ElevatorIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="4" y="2" width="16" height="20" rx="2" /><path d="M10 6l2-2 2 2" /><path d="M10 18l2 2 2-2" /><path d="M8 10h8" /><path d="M8 14h8" />
    </svg>
  );
}

function GymIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="10" width="4" height="4" rx="1" /><rect x="18" y="10" width="4" height="4" rx="1" /><rect x="6" y="8" width="12" height="8" rx="1" /><path d="M6 14V8" /><path d="M18 14V8" />
    </svg>
  );
}

function SaunaIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="4" y="4" width="16" height="16" rx="3" /><path d="M8 20v2" /><path d="M16 20v2" /><path d="M9 9c0 2 1 3 3 3s3-1 3-3" /><path d="M9 14c0 1 1 2 3 2s3-1 3-2" />
    </svg>
  );
}

function SkiStorageIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 2v20" /><path d="M6 10l3-3h4" /><path d="M6 16l5 5" /><path d="M14 4l3 3-3 3" />
    </svg>
  );
}

function BoatDockIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2 22L22 22" /><path d="M6 18V6l6-3v15" /><path d="M12 3L18 6v12" /><path d="M6 10h12" /><path d="M6 14h12" />
    </svg>
  );
}

function BreakfastIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 8h1a4 4 0 010 8h-1" /><path d="M2 8h16v8a6 6 0 01-12 0v-1" /><path d="M6 8V6c0-2 2-3 6-3s6 1 6 3v2" /><path d="M10 16v2" /><path d="M14 16v2" />
    </svg>
  );
}

function RoomServiceIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 2a10 10 0 0110 10" /><path d="M12 6a6 6 0 016 6" /><circle cx="12" cy="12" r="2" fill="currentColor" /><path d="M2 22L8 16" /><path d="M16 8L22 2" />
    </svg>
  );
}

function MaidServiceIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 22l4-4 4 4" /><path d="M7 18v4" /><path d="M11 7a4 4 0 11-8 0 4 4 0 018 0z" /><path d="M17 11l-6 6" /><path d="M21 7l-10 10" />
    </svg>
  );
}

function ConciergeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" /><path d="M8 14s1.5 2 4 2 4-2 4-2" /><path d="M9 9h.01" /><path d="M15 9h.01" />
    </svg>
  );
}

function SmartHomeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 10l9-7 9 7" /><path d="M5 10v10a2 2 0 002 2h10a2 2 0 002-2V10" /><path d="M9 16a3 3 0 016 0" /><circle cx="12" cy="11" r="1" fill="currentColor" />
    </svg>
  );
}

function ValetParkingIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="3" /><path d="M10 16V8h3a3 3 0 010 6h-3" /><path d="M5 3l2 4" /><path d="M19 3l-2 4" />
    </svg>
  );
}

function SurfboardIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 3l4 16" /><path d="M18 3l-4 16" /><path d="M3 8c3-1 6-1 9 0s6 1 9 0" /><path d="M3 16c3-1 6-1 9 0s6 1 9 0" />
    </svg>
  );
}

function HeatedFloorsIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="2" /><path d="M8 12h8" /><path d="M12 8v8" /><path d="M4 4l2 3" /><path d="M20 4l-2 3" />
    </svg>
  );
}

function OutdoorShowerIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 2v10" /><path d="M6 8l6-6 6 6" /><path d="M4 12a8 8 0 0016 0" /><path d="M8 16c0-2 2-3 4-3s4 1 4 3" />
    </svg>
  );
}

function FirePitIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 2C10 5 8 7 8 10c0 2.2 1.8 4 4 4s4-1.8 4-4c0-3-2-5-4-8z" /><path d="M8 14c0 1.5 1.5 3 4 3s4-1.5 4-3" /><rect x="4" y="17" width="16" height="4" rx="2" />
    </svg>
  );
}

function HikingIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="13" cy="4" r="2" /><path d="M7 21l3-6 3 6" /><path d="M13 14l2-3 4 3" /><path d="M10 12l-3 3" /><path d="M15 8l-2 3" />
    </svg>
  );
}

function YogaDeckIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="5" r="2" /><path d="M4 21c2-2 4-6 8-6s6 4 8 6" /><path d="M12 11v4" /><path d="M8 15l4 2 4-2" />
    </svg>
  );
}

function CookingClassIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" /><path d="M8 14c0-2 2-3 4-3s4 1 4 3" /><path d="M9 9h.01" /><path d="M15 9h.01" /><path d="M8 7l-2 4" /><path d="M16 7l2 4" />
    </svg>
  );
}

function KayaksIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 16c3-2 6-2 9 0s6 2 9 0" /><path d="M3 20c3-2 6-2 9 0s6 2 9 0" /><path d="M6 8l3 8" /><path d="M18 8l-3 8" /><path d="M9 6c0-2 3-2 3-2s3 0 3 2" />
    </svg>
  );
}

function SnorkelingIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="7" r="4" /><path d="M4 17c2-2 4-2 6 0s4 2 6 0 4-2 6 0" /><path d="M12 11v8" /><path d="M8 19h8" />
    </svg>
  );
}

function MiniBarIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="4" y="2" width="16" height="20" rx="2" /><path d="M8 10h8" /><path d="M12 10v4" /><circle cx="12" cy="16" r="2" fill="currentColor" />
    </svg>
  );
}

function ButlerServiceIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="6" width="20" height="12" rx="2" /><path d="M6 6V4a2 2 0 012-2h8a2 2 0 012 2v2" /><path d="M12 12h.01" /><path d="M8 14h8" />
    </svg>
  );
}

function BikesAvailableIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="6" cy="16" r="3" /><circle cx="18" cy="16" r="3" /><path d="M16 8l-3-4h-3" /><path d="M6 16l2-6h4" /><path d="M18 16l-1-4h-4" />
    </svg>
  );
}

function BirdWatchingIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 15c2-2 4-2 6 0s4 2 6 0 4-2 6 0" /><path d="M12 3v8" /><path d="M9 6l3-3 3 3" /><circle cx="12" cy="14" r="1" fill="currentColor" />
    </svg>
  );
}

function LakeAccessIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2 20c2-1.5 4-1.5 6 0s4 1.5 6 0" /><path d="M2 16c2-1.5 4-1.5 6 0s4 1.5 6 0" /><path d="M12 2v10" /><path d="M9 6l3-4 3 4" />
    </svg>
  );
}

function GuidedToursIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" /><path d="M2 12h20" /><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
    </svg>
  );
}

function VinylPlayerIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="3" /><circle cx="12" cy="12" r="1" fill="currentColor" />
    </svg>
  );
}

function RooftopTerraceIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 10l9-7 9 7" /><path d="M5 10v10a2 2 0 002 2h10a2 2 0 002-2V10" /><path d="M8 14h8" /><path d="M8 18h8" />
    </svg>
  );
}

const amenityIcons: Record<string, ReactNode> = {
  WiFi: <WifiIcon />,
  Pool: <PoolIcon />,
  Kitchen: <KitchenIcon />,
  "Air Conditioning": <AirConIcon />,
  Parking: <ParkingIcon />,
  "Ocean View": <OceanViewIcon />,
  "Lake View": <LakeViewIcon />,
  "Mountain View": <MountainViewIcon />,
  Garden: <GardenIcon />,
  "Hot Tub": <HotTubIcon />,
  Fireplace: <FireplaceIcon />,
  "Pet Friendly": <PetFriendlyIcon />,
  "Smart TV": <SmartTVIcon />,
  Washer: <WasherIcon />,
  Dryer: <DryerIcon />,
  Elevator: <ElevatorIcon />,
  Gym: <GymIcon />,
  Sauna: <SaunaIcon />,
  "Ski Storage": <SkiStorageIcon />,
  "Boat Dock": <BoatDockIcon />,
  "Breakfast Included": <BreakfastIcon />,
  "Room Service": <RoomServiceIcon />,
  "Maid Service": <MaidServiceIcon />,
  Concierge: <ConciergeIcon />,
  "Smart Home": <SmartHomeIcon />,
  "Valet Parking": <ValetParkingIcon />,
  "Surfboard Storage": <SurfboardIcon />,
  "Heated Floors": <HeatedFloorsIcon />,
  "Outdoor Shower": <OutdoorShowerIcon />,
  "Fire Pit": <FirePitIcon />,
  "Hiking Access": <HikingIcon />,
  "Yoga Deck": <YogaDeckIcon />,
  "Cooking Class": <CookingClassIcon />,
  Kayaks: <KayaksIcon />,
  "Snorkeling Gear": <SnorkelingIcon />,
  "Mini Bar": <MiniBarIcon />,
  "Butler Service": <ButlerServiceIcon />,
  "Bikes Available": <BikesAvailableIcon />,
  "Bird Watching": <BirdWatchingIcon />,
  "Lake Access": <LakeAccessIcon />,
  "Guided Tours": <GuidedToursIcon />,
  "Vinyl Player": <VinylPlayerIcon />,
  "Rooftop Terrace": <RooftopTerraceIcon />,
  Rooftop: <RooftopTerraceIcon />,
};

/**
 * Server Component: displays a grid of amenities with inline SVG icons.
 * Renders a clean, labeled grid using icons mapped by name.
 */
export default function AmenitiesGrid({ amenities }: AmenitiesGridProps) {
  if (amenities.length === 0) {
    return null;
  }

  return (
    <section>
      <h2 className="mb-4 text-lg font-semibold text-text-primary">
        What this place offers
      </h2>
      <div className="grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3">
        {amenities.map((amenity) => (
          <div
            key={amenity}
            className="flex items-center gap-3 text-sm text-text-primary"
          >
            <span className="shrink-0 text-xl" aria-hidden="true">
              {amenityIcons[amenity] ?? (
                <svg className="h-5 w-5 text-gray-soft" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 16v-4M12 8h.01" />
                </svg>
              )}
            </span>
            <span>{amenity}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
