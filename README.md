# SkinArtist
This script automates the process of creating NameMC skin art.

## Prerequisites
- Node.js v18.0.0 or higher
- Yarn v1.22.21 or higher

## Installation
Install all of the dependencies.
```bash
$ yarn install
```

Now ensure that you have the following two files in the project's root directory:
- ``template.png`` (72x24 pixels)
    - This will be the image that you'll be putting on your NamePC page. Put whatever you want on it.
- ``baseskin.png`` (64x64 or 64x32 pixels)
    - This will be the skin that we'll use to generate the other skins. You can use any skin here, but do **NOT** have anything on the front of the head's second layer, as it will obscure the face, therefore your skin art will not be displayed correctly. The script does not account for this for the time being.

## Running
After everything is prepared, all you need to do now is run the script. It will handle the rest.
```bash
$ node main.js
```

If the ``skins`` directory does not exist, it will be created. The script will generate the skins and put them in the ``skins`` directory. That's it.

💡 *As NameMC will not update your current skin if it's identical to your current skin, random noise will be also be generated in a small area of the skin that shouldn't be visible unless you're looking for it. This is in case two sections of the template image are identical (This could happen with an image with a solid background).*

## Applying the skins
After running the script, you should see about 27 .png files named ``skin_#.png``, where # is 1 through 27. Apply these skins to your Minecraft profile in ascending order, starting with ``skin_1.png`` and ending with ``skin_27.png``. 

If you want to use your own personal skin, you can just end with ``skin_26.png`` instead. Do note that this will come at the cost of an 8x8 area on the very top left of your image being obscured by your personal skin's face. **You must account for this yourself when making your image, as there's no way to hide your current skin on NameMC.**

As NameMC will not always immediately update your skins, just be patient while applying the skins. If your skins don't update immediately, just refresh your profile page every now and then until they do.
