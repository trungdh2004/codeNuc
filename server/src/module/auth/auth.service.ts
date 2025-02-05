import axios from "axios";
import UserModel from "../../models/User.model";
import { BadRequestException } from "../../utils/catchError";
import {
  accessTokenSignOptions,
  refreshTokenSignOptions,
  signJwtToken,
  verifyToken,
} from "../../utils/jwt";
import { appConfig } from "../../config/appConfig";

export class AuthService {
  async login(token: string) {
    const { data } = await axios.get(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!data) {
      throw new BadRequestException("Token google lỗi");
    }

    const user = await this.findByUuid(data.id);

    if (user) {
      const accessToken = signJwtToken(
        {
          userId: user._id,
        },
        accessTokenSignOptions
      );

      const refreshToken = signJwtToken(
        {
          userId: user._id,
        },
        refreshTokenSignOptions
      );

      return {
        accessToken,
        refreshToken,
        user,
      };
    } else {
      const newUser = await UserModel.create({
        uuid: data.id,
        email: data.email,
        name: data.name,
        avatar: data.picture,
      });

      if (!newUser) {
        throw new BadRequestException("Đăng nhập lỗi");
      }

      const accessToken = signJwtToken(
        {
          userId: newUser._id,
        },
        accessTokenSignOptions
      );

      const refreshToken = signJwtToken(
        {
          userId: newUser._id,
        },
        accessTokenSignOptions
      );

      return {
        accessToken,
        refreshToken,
        user: newUser,
      };
    }
  }

  async findByUuid(uuid: string) {
    const user = await UserModel.findOne({
      uuid,
    });

    return user;
  }

  async findById(id: string) {
    const user = await UserModel.findById(id);

    if (!user) {
      throw new BadRequestException("Không có người dùng nào");
    }

    return user;
  }

  async refreshToken(token: string) {
    const { error, payload } = await verifyToken(token, {
      secret: appConfig.JWT.SECRET,
    });

    if (error || !payload) {
      throw new BadRequestException(error);
    }

    const user = await this.findById(payload.userId as string);

    const accessToken = signJwtToken(
      {
        userId: user._id,
      },
      accessTokenSignOptions
    );

    const refreshToken = signJwtToken(
      {
        userId: user._id,
      },
      refreshTokenSignOptions
    );

    return {
      accessToken,
      refreshToken,
      user,
    };
  }

  async logOut(token: string) {
    const { error, payload } = await verifyToken(token, {
      secret: appConfig.JWT.SECRET,
    });

    if (error || !payload) {
      throw new BadRequestException(error);
    }

    return true;
  }

  
}
