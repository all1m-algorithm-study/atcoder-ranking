import re

src = ""
with open("compose.yml.template", "r") as f:
    src = "".join(f.readlines())

p = re.compile("\{[A-Z_]+\}")
for token in set(p.findall(src)):
    env = input(f"Set {token}:")
    src = src.replace(token, env)

with open("compose.yml", "w") as f:
    f.write(src)