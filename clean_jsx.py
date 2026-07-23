import re
import glob

def clean_file(filepath):
    with open(filepath, "r") as f:
        content = f.read()

    # The bad injection is exactly this string:
    bad_string = ' className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ctp-mauve)] min-h-[44px] min-w-[44px]"'
    
    # We want to remove this string if it appears right after <button, <input, <select
    content = re.sub(r'(<(?:button|input|select))' + re.escape(bad_string), r'\1', content)

    # But wait, did it get injected on the same line and then there's another className on the next line?
    # Actually, in the error output, we see:
    # <button className="focus-visible:..." ...
    # And then later:
    # className="..."
    
    with open(filepath, "w") as f:
        f.write(content)

for file in glob.glob("components/*.tsx"):
    clean_file(file)

print("Cleaned!")
