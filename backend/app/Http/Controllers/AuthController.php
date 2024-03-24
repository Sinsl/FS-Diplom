<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;


class AuthController extends Controller
{
    public function register(Request $request) {
        $validator = Validator::make($request->all(), [
            'email' => ['required', 'string', 'email', 'max:255'],
            'password' => ['required', 'string', 'min:6'],
            'devace_name' => ['required', 'string']
        ]);

        if ($validator->fails()) {
            return response()->json(['err' => $validator->errors()], 401);
        }

        $user = User::where('email', $request->email)->first();

        if(!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['error' => 'Ошибка аутентификации'], 401);
        }
        return response()->json(['token' => $user->createToken($request->device_name)->plainTextToken]);

    }

    public function token(Request $request) {
        $validator = Validator::make($request->all(), [
            'email' => ['required', 'string', 'email', 'max:255'],
            'password' => ['required', 'string', 'min:6'],
            'devace_name' => ['required', 'string']
        ]);

        if ($validator->fails()) {
            return response()->json(['err' => $validator->errors()], 401);
        }

        $user = User::where('email', $request->email)->first();

        if(!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['error' => 'Ошибка аутентификации'], 401);
        }
        return response()->json(['token' => $user->createToken($request->device_name)->plainTextToken]);

    }
}