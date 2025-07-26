<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    protected $table = 'products';
    protected $fillable = ['user_id','category', 'title', 'image', 'price', 'discount', 'shipping_cost', 'return', 'description','city','province','address'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function images()
    {
        return $this->hasMany(Image::class);
    }



    public static function boot()
    {
        parent::boot();
        self::deleting(function ($product) { // before delete() method call this
            $product->images()->each(function ($image) {
                $image->delete(); // <-- direct deletion
            });
        });
    }


}
