import bpy
from os.path import dirname, join

if bpy.context.object and bpy.data.filepath:
    fname = bpy.context.object.name + ".matrix"
    fpath = join(dirname(bpy.data.filepath),  fname)

    f = open(fpath, "w")
    f.write(str(bpy.context.object.matrix_world))
    f.close()
