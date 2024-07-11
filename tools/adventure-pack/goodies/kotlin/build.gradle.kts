import com.ncorti.ktfmt.gradle.tasks.*
import org.gradle.api.tasks.testing.logging.TestExceptionFormat

plugins {
  kotlin("jvm") version "2.0.0"

  id("com.ncorti.ktfmt.gradle") version "0.19.0"
}

sourceSets {
  main {
    kotlin {
      srcDirs("src")
      exclude("**/Test.kt")
    }
  }
  test {
    kotlin {
      srcDirs("src")
      include("**/Test.kt")
    }
  }
}

repositories { mavenCentral() }

dependencies { testImplementation(kotlin("test")) }

tasks.test {
  useJUnitPlatform()

  testLogging {
    events("failed", "passed", "skipped", "standard_error", "standard_out")
    exceptionFormat = TestExceptionFormat.FULL
  }
}

// For some reason ktfmtFormat and other tasks automatically added by the ktfmt
// plugin don't correctly detect the files to format, so we define our own
// custom task instead.
// TODO: investigate further
tasks.register<KtfmtFormatTask>("ktfmtCustom") {
  source = project.fileTree(rootDir)
  include("*.gradle.kts")
  include("**/*.kt")
}

// TODO: Kotlin equivalent of -Xlint:all
