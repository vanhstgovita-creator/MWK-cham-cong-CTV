import os
import glob
import re

ksk_menu = """
            <!-- NHÓM CTV KSK -->
            <div class="menu-item">
                <div class="level-1">
                    <div>
                        <i class="fa-solid fa-stethoscope icon-left"></i>
                        Cộng tác viên KSK
                    </div>
                    <i class="fa-solid fa-chevron-down arrow" id="arrow-ksk"></i>
                </div>
                <div class="level-2" id="menu-ksk" style="display:none;">
                    <div class="level-2-group">
                        <div class="level-2-item">
                            <span>Chấm công KSK</span>
                        </div>
                        <div class="level-3">
                            <a href="bangdulieucongctvksk.html" id="NAV_bangdulieucongctvksk">
                                <i class="fa-solid fa-clock"></i> Bảng dữ liệu chấm công
                            </a>
                            <a href="bangtonghopcongctvksk.html" id="NAV_bangtonghopcongctvksk">
                                <i class="fa-solid fa-calculator"></i> Tổng hợp công
                            </a>
                            <a href="bangchotcongctvksk.html" id="NAV_bangchotcongctvksk">
                                <i class="fa-solid fa-check-double"></i> Bảng chốt công
                            </a>
                        </div>
                    </div>
                </div>
            </div>
"""

def update_sidebar():
    html_files = glob.glob("*.html")
    for file in html_files:
        with open(file, 'r', encoding='utf-8') as f:
            content = f.read()

        # Check if already inserted
        if 'id="menu-ksk"' in content:
            print(f"Skipping {file} - already has KSK menu")
            continue

        # Look for the BVPK menu closing to insert right after it
        # BVPK menu block usually ends before the sidebar closes
        # So we can search for the end of the BVPK menu
        
        # Regex to find the BVPK menu closing </div></div></div> (end of menu-item)
        # We find: <!-- NHÓM CTV BV/PK --> ... <div class="menu-item"> ... </div></div></div>
        match = re.search(r'(<!-- NHÓM CTV BV/PK -->.*?<div class="level-2" id="menu-bvpk".*?</div>\s*</div>\s*</div>)', content, re.DOTALL)
        
        if match:
            new_content = content[:match.end()] + "\n" + ksk_menu + content[match.end():]
            with open(file, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Updated {file}")
        else:
            print(f"Could not find insertion point in {file}")

if __name__ == "__main__":
    update_sidebar()
