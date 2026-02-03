import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Persona } from "../types";

interface PersonaContextType {
  persona: Persona;
  setPersona: (persona: Persona) => void;
}

const PersonaContext = createContext<PersonaContextType | undefined>(undefined);

export const PersonaProvider = ({ children }: { children: ReactNode }) => {
  const [persona, setInternalPersona] = useState<Persona>(() => {
    const stored = localStorage.getItem("vcore_persona");
    return stored === "developer" || stored === "hr"
      ? (stored as Persona)
      : null;
  });

  const setPersona = (p: Persona) => {
    setInternalPersona(p);
    if (p) {
      localStorage.setItem("vcore_persona", p);
    } else {
      localStorage.removeItem("vcore_persona");
    }
  };

  return (
    <PersonaContext.Provider value={{ persona, setPersona }}>
      {children}
    </PersonaContext.Provider>
  );
};

export const usePersona = () => {
  const context = useContext(PersonaContext);
  if (!context)
    throw new Error("usePersona must be used within a PersonaProvider");
  return context;
};
