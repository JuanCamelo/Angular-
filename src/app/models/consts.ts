import {CalendarConfig} from "src/app/models/Calendar-Config" 
/**
 * Nombre de la entrada en el localStorage para el
 * archivo de configuración de la aplicación
 */
export const CONFIG_LS_NAME = '{ac717e4a-636a-4359-a281-eed3e6dc6b2f}';
/**
 * Nombre de la entrada en el localStorage para la sesión
 * de usuario
 */
export const SESSION_LS_NAME = '{9c3b1eaa-3bcc-4514-8cc8-5da5fee9ad40}';


export const REG_MED_ID = 'registroMedicoId';

export const DEFAULT_CALENDAR: string = "57D01805-B0AA-4102-82DA-F09EF6844910";

export const CALENDARS: Array<CalendarConfig> = [
    { //PRIORITY
        CODE: "AAA",
        CALENDAR_ID: "3F79952F-1FC2-4362-8739-2D9B2B0147C4",
        IS_MULTIPLE_SELECTION: false
    },
    { //INDIVIDUAL - GENERAL
        CODE: "AAB",
        CALENDAR_ID: "3F79952F-1FC2-4362-8739-2D9B2B0147C4",
        IS_MULTIPLE_SELECTION: false
    },
    { //INDIVIDUAL - SPECIALIST APPOINTMENT
        CODE: "AAC",
        CALENDAR_ID: "3F79952F-1FC2-4362-8739-2D9B2B0147C4",
        IS_MULTIPLE_SELECTION: false
    },
    { //MULTIPLE
        CODE: "AAD",
        CALENDAR_ID: "3F79952F-1FC2-4362-8739-2D9B2B0147C4",
        IS_MULTIPLE_SELECTION: true
    },
    { //MEDICAL_BOARD
        CODE: "AAE",
        CALENDAR_ID: "3F79952F-1FC2-4362-8739-2D9B2B0147C4",
        IS_MULTIPLE_SELECTION: true
    },
    { //PROGRAM
        CODE: "AAF",
        CALENDAR_ID: "3F79952F-1FC2-4362-8739-2D9B2B0147C4",
        IS_MULTIPLE_SELECTION: true
    }
];