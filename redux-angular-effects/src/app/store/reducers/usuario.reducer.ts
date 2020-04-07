import { createReducer, on } from '@ngrx/store';
import { Usuario } from '../../models/usuario.model';
import { 
    cargarUsuario,
    cargarUsuarioError,
    cargarUsuarioSuccess
} from '../actions';

export interface UsuarioState {
    id: string;
    user: Usuario;
    loaded: boolean;
    loading: boolean;
    error: any;
}

export const usuarioInitialState: UsuarioState = {
    id: null,
    user: null,
    loaded: false,
    loading: false,
    error: null
}

const _usuarioReducer = createReducer(usuarioInitialState,

    on(cargarUsuario, (state, { id }) => {
        return {
            ...state,
            loading: true,
            id: id
        };
    }),
    on(cargarUsuarioSuccess, (state, { usuario }) => {
        return {
            ...state,
            loading: false,
            loaded: true,
            user: { ...usuario }
        };
    }),
    on(cargarUsuarioError, (state, { payload }) => {
        return {
            ...state,
            loading: false,
            loaded: false,
            error: {
                url: payload.url,
                name: payload.name,
                message: payload.message
            }
        }
    }),

);

export function usuarioReducer(state, action) {
    return _usuarioReducer(state, action);
}