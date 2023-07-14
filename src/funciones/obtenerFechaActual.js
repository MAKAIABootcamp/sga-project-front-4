import { format, isSameDay } from 'date-fns';
import { useState } from "react";
import esLocale from 'date-fns/locale/es';

const [fechaActual, setFechaActual] = useState(new Date());
console.log(fechaActual);