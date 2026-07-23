import re
import glob

def merge_classnames(content):
    # Regex to find tags like <button ... className="..." ... className="..." ...>
    # It's better to find all <button, <input, <select tags and process them.
    
    def process_tag(match):
        tag_content = match.group(0)
        # Find all className attributes. They can be className="..." or className={`...`}
        # We need a regex that matches both safely
        # It's easier to find them iteratively
        classnames = []
        
        # Match className="xxx"
        for m in re.finditer(r'className=(["\'])(.*?)\1', tag_content):
            classnames.append(m.group(2))
        
        # Match className={`xxx`}
        for m in re.finditer(r'className=\{`(.*?)`\}', tag_content, flags=re.DOTALL):
            classnames.append(m.group(1))
            
        if len(classnames) <= 1:
            return tag_content
            
        # Combine all classNames
        merged_classes = " ".join([c.strip() for c in classnames])
        merged_classes = " ".join(merged_classes.split()) # remove extra spaces
        
        # Remove all existing classNames from tag_content
        tag_content = re.sub(r'\s*className=(["\']).*?\1', '', tag_content)
        tag_content = re.sub(r'\s*className=\{`.*?`\}', '', tag_content, flags=re.DOTALL)
        
        # Append the merged className before the closing >
        # Need to handle self-closing tags '/>' vs '>'
        if tag_content.endswith('/>'):
            tag_content = tag_content[:-2] + f' className="{merged_classes}" />'
        elif tag_content.endswith('>'):
            tag_content = tag_content[:-1] + f' className="{merged_classes}">'
            
        return tag_content

    # We match any tag that has multiple classNames. Let's just process all <button, <input, <select
    content = re.sub(r'<(button|input|select)[^>]*>', process_tag, content, flags=re.DOTALL)
    return content

for file in glob.glob("components/*.tsx"):
    with open(file, "r") as f:
        c = f.read()
    
    c = merge_classnames(c)
    
    # Fix the e.target.click() typescript error
    c = c.replace('e.target.click()', '(e.target as HTMLElement).click()')
    
    with open(file, "w") as f:
        f.write(c)

print("Fixed JSX attributes")
