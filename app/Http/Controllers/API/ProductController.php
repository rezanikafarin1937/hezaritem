<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\Procuct\StoreRequest;
use App\Http\Requests\User\UpdateRequest;
use App\Models\Product;
use App\Models\Image;
use App\Models\Category;
use App\Models\City;
use App\Models\Province;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;

class ProductController extends Controller
{
    public function index()
    {

        $title = request()->get('title');
        $catId =  request()->get('catId');
        $cities =  request()->get('cities');
        $arr = explode(",",$cities);
        return response()->json($cities[0]);

        if ($catId == 0) {
            $products = Product::orderBy('created_at', 'desc')->whereIn('city',$arr)->where('title','LIKE','%'.$title.'%')->paginate(100);
        } else {
            $products = Product::orderBy('created_at', 'desc')->where('category', $catId)->where('title','LIKE','%'.$title.'%')->paginate(100);
        }
        return response()->json($products, 200);
    }

    // public function search($title){
    //     $products = Product::where('title','LIKE','%'.$title.'%')->paginate(100);
    //     return response()->json($products, 200);

    // }



    public function create()
    {
        //
    }
    public function store(\App\Http\Requests\Product\StoreRequest $request)
    {
        $product = Product::create([
            'user_id' => $request->user_id,
            'title' => $request->title,
            'price' => $request->price,
            'category_id' => $request->category,
            'discount' => $request->discount,
            'description' => $request->description,
            'return' => $request->return,
            'shipping_cost' => $request->shipping_cost,
        ]);

        if ($request->hasFile('images')) {
            $i = 0;
            foreach ($request->images as $img) {
                $name = $img->getClientOriginalName();
                $dot = strpos($name, '.');
                $nameImage = time() . "_" . $product->id . "_" . $i . substr($name, $dot);
                $myfile = public_path("product_image\\" . $product->id . "\\" . $nameImage);
                if (file_exists($myfile)) {
                    File::delete($myfile);
                }
                $files = $request->file("images");
                $file = $files[$i];
                $file->move('product_image/' . $product->id, $nameImage);

                if ($i === 0) {
                    $product->image = "http://localhost/back-sef/public/product_image/" . $product->id . "/" . $nameImage;
                    $product->save();
                } else {
                    $image = new Image();
                    $image->address = "http://localhost/back-sef/public/product_image/" . $product->id . "/" . $nameImage;
                    $image->product_id = $product->id;
                    $image->save();
                }
                $i += 1;
            }
        }

        return response($product, 201);
    }

    public function categories()
    {
        $categories = Category::all();
        return response()->json($categories, 200);
    }

    public function cities()
    {
        $cities = City::all();
        return response()->json($cities, 200);
    }

    public function provinces()
    {
        $provinces = Province::all();
        return response()->json($provinces, 200);
    }

    // public function categoryId($cat_id){
    //     $products = Product::where('category_id',$cat_id)->get();
    //     return response()->json($products,200);
    // }


    public function show($id)
    {
        try {
            $product =  Product::findOrFail($id);
            $data = [
                'id' => $product->id,
                'return' => $product->return,
                'user_id' => $product->user_id,
                'title' => $product->title,
                'image' => $product->image,
                'price' => $product->price,
                'discount' => $product->discount,
                'description' => $product->description,
                'shipping_cost' => $product->shipping_cost,
                'images' => $product->images,
                'category' => $product->category,
                'products' => $product->user,
            ];
            return response()->json($data, 200);
        } catch (\Exception $e) {
            return response(['message' => $e->getMessage()], 404);
        }
    }


    public function update(\App\Http\Requests\Product\UpdateRequest $request, $id)
    {
        $product =  Product::findOrFail($id);
        $data = $request->only(['title', 'shipping_cost', 'return', 'description', 'price', 'image', 'images']);

        if ($request->idDeleteImages) {
            $i = 0;
            foreach ($request->idDeleteImages as $idDel) {
                $slash = strrpos($product->image, '/');
                $imageProduct = substr($product->image, $slash + 1);

                if ($imageProduct == $request->nameDeleteImages[$i]) {
                    $product->image = "";
                    $product->save();
                }

                Image::where('id', $idDel)->delete();
                $myfile = public_path("product_image\\" . $product->id . "\\" . $request->nameDeleteImages[$i]);
                File::delete($myfile);
                $i += 1;
            }
        }

        if ($request->hasFile('images')) {
            $i = 0;
            foreach ($request->images as $img) {
                $name = $img->getClientOriginalName();
                $dot = strpos($name, '.');
                $nameImage = time() . "_" . $product->id . "_" . $i . substr($name, $dot);
                $myfile = public_path("product_image\\" . $product->id . "\\" . $nameImage);

                $files = $request->file("images");
                $file = $files[$i];
                $file->move('product_image/' . $product->id, $nameImage);
                if (strlen($product->image) == 0) {
                    $product->image = "http://localhost/back-sef/public/product_image/" . $product->id . "/" . $nameImage;
                    $product->save();
                } else {
                    $image = new Image();
                    $image->address = "http://localhost/back-sef/public/product_image/" . $product->id . "/" . $nameImage;
                    $image->product_id = $product->id;
                    $image->save();
                }
                $i += 1;
            }
        }

        if (strlen($product->image) == 0) {
            $allImages = Image::where('product_id', $id)->get();
            if (count($allImages) > 0) {
                $product->image = $allImages[0]->address;
                $product->save();
                $allImages[0]->delete();
            }
        }

        $product->update($data);
        return response($product, 202);
    }



    public function destroy($id)
    {
        $product = Product::findOrFail($id);
        $product->delete();
        return response(null, 204);
    }
}
