<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\User\StoreRequest;
use App\Http\Requests\User\UpdateRequest;
use App\Models\Product;
use App\Models\User;
use Illuminate\Foundation\Auth\Access\Authorizable;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\DB;


use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;


class UserController extends Controller
{
    public function index(Request $request)
    {
        $users = User::orderBy('created_at', 'desc')->paginate(10);
        //    $users =  User::all();
        return response()->json($users, 200);
    }

    public function general(Request $request)
    {
        $name = request()->get('title');
        $users = User::where('type', 'ADMIN')->where('name', 'LIKE', '%' . $name . '%')->orderBy('created_at', 'desc')->paginate(12);
        return response()->json($users, 200);
    }


    public function create()
    {
        //
    }
    
    public function login($id){
        try {
            $user =  User::findOrFail($id);
            $data = [
                'id' => $user->id,
                'name' => $user->name,
                'avatar' => $user->avatar,
                'mobile' => $user->mobile,
                'type' => $user->type,
                'city' => $user->city,
                'address' => $user->address,
                'email' => $user->email,
                'products' => $user->products,
                'api_token' => $user->api_token,
            ];
            return response()->json($data, 200);
        } catch (\Exception $e) {
            return response(['message' => $e->getMessage()], 404);
        }

    }

    public function store(StoreRequest $request)
    {
        $user = User::create([
            'name' => $request->name,
            'mobile' => $request->mobile,
            'type' => $request->type,
            'city' => $request->city,
            'address' => $request->address,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'api_token' => Str::random(100),
        ]);
        if ($request->avatar === null) {
            return "100";
            return response($user, 201);
        } else if ($request->hasFile('avatar')) {
            $file = $request->file('avatar');
            $name = $file->getClientOriginalName();
            $dot = strpos($name, '.');
            $nameImage = $user->id . substr($name, $dot);
            $myfile = public_path("/user_avatar/" . $name);
            if (file_exists($myfile)) {
                $img = File::delete($myfile);
            }
            $file->move('user_avatar', $nameImage);
            $user->avatar = "http://localhost/back-sef/public/user_avatar/" . $nameImage;
            $user->save();
        }


        return response($user, 201);
    }



    public function show($id)
    {
        try {
            $user =  User::findOrFail($id);
            $data = [
                'id' => $user->id,
                'name' => $user->name,
                'avatar' => $user->avatar,
                'mobile' => $user->mobile,
                'type' => $user->type,
                'city' => $user->city,
                'address' => $user->address,
                'email' => $user->email,
                'products' => $user->products,
            ];
            return response()->json($data, 200);
        } catch (\Exception $e) {
            return response(['message' => $e->getMessage()], 404);
        }
    }


    public function edit($id)
    {
        //
    }
    public function update(Request $request, $id)
    {
        $user =  User::findOrFail($id);
        if ($user->email == $request->email) {
            $validated = $request->validate([
                'name' => 'required|string|min:2|max:100',
                'type' => 'required',
                'city' => 'required|string|min:2|max:50',
                'address' => 'required|string|min:2',
                'password' => 'required|string|min:6|max:50',
                'avatar' => 'nullable'

                // mobile ens email should not validate
                // 'email' => 'required|string|email|unique:users,email',
                // 'mobile' => 'required|string|min:11|max:11|unique:users,mobile',

            ]);
        } else

        if ($user->email != $request->email) {
            $validated = $request->validate([
                'name' => 'required|string|min:2|max:100',
                'type' => 'required',
                'city' => 'required|string|min:2|max:50',
                'address' => 'required|string|min:2',
                'email' => 'required|string|email|unique:users,email',
                'password' => 'required|string|min:6|max:50',
                'avatar' => 'nullable'

                // mobile should not validate
                // 'mobile' => 'required|string|min:11|max:11|unique:users,mobile',

            ]);
        }


        if ($user->mobile == $request->mobile) {
            $validated = $request->validate([
                'name' => 'required|string|min:2|max:100',
                'type' => 'required',
                'city' => 'required|string|min:2|max:50',
                'address' => 'required|string|min:2',
                'password' => 'required|string|min:6|max:50',
                'avatar' => 'nullable'

                // mobile and email should not validate
                // 'mobile' => 'required|string|min:11|max:11|unique:users,mobile',
                // 'email' => 'required|string|email|unique:users,email',

            ]);
        } else

        if ($user->mobile != $request->mobile) {
            $validated = $request->validate([
                'name' => 'required|string|min:2|max:100',
                'mobile' => 'required|string|min:11|max:11|unique:users,mobile',
                'type' => 'required',
                'city' => 'required|string|min:2|max:50',
                'address' => 'required|string|min:2',
                'password' => 'required|string|min:6|max:50',
                'avatar' => 'nullable'

                // email should not validate
                // 'email' => 'required|string|email|unique:users,email',
            ]);
        }


        if (!$request->hasFile('avatar')) {
            $data = $request->only(['name', 'city', 'email', 'mobile', 'address', 'type']);
            $user->update($data);
            return response($user, 202);
        } else if ($request->hasFile('avatar')) {
            $file = $request->file('avatar');
            $name = $file->getClientOriginalName();
            $dot = strpos($name, '.');
            $nameImage = $user->id . substr($name, $dot);
            $myfile = public_path("/user_avatar/" . $name);
            if (file_exists($myfile)) {
                File::delete($myfile);
            }
            $file->move('user_avatar', $nameImage);
            $user->avatar = "http://localhost/back-sef/public/user_avatar/" . $nameImage;
            $user->save();
        }
        $data = $request->only(['name', 'city', 'email', 'mobile', 'address', 'type']);
        $user->update($data);
        return response($user, 202);
    }



    public function destroy($id)
    {
        $user = User::findOrFail($id);
        foreach ($user->products as $p) {
            $p->delete();
        }
        $user->save();
        // return response($user->products,200);
        if ($user->avatar) {
            $dot = strpos($user->avatar, '.');
            $name = $user->id . substr($user->avatar, $dot);
            $myfile = public_path("/user_avatar/" . $name);
            if (file_exists($myfile)) {
                File::delete($myfile);
            }
        }

        // User::find($id)->delete();

        // $user = User::findOrFail($id);
        // $user->delete();
        // User::whereId($user->id)->delete();
        // DB::table('users')->where('id', $id)->delete();
        // $user->org_departments()->delete();
        $user = User::findOrFail($id);
        if ($user) {
            return $user->delete();
        }
    }
}
