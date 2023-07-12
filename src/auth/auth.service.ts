import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/users/user.entity';
import { JwtService } from '@nestjs/jwt'; // Importa el servicio de JWT

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    private jwtService: JwtService, // Inyecta el servicio de JWT
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    // Busca al usuario por su nombre de usuario
    const user = await this.usersRepository.findOne({ username });
    // Si existe y su contraseña coincide con la recibida, devuelve el usuario sin la contraseña
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    // Si no, devuelve null
    return null;
  }

  async login(user: any) {
    // Extrae el id y el nombre de usuario del usuario recibido
    const payload = { id: user.id, username: user.username };
    // Genera un token JWT con el payload y una clave secreta
    const token = this.jwtService.sign(payload);
    // Devuelve el token JWT como una cadena
    return token;
  }

  async validateToken(token: string) {
    // Decodifica el token JWT con la misma clave secreta que se usó para generar el token
    const payload = this.jwtService.verify(token);
    // Si el token es válido y no ha expirado, devuelve el usuario que contiene el token
    return payload;
    // Si no, lanza una excepción
  }
}
